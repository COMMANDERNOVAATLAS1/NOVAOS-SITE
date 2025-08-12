import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

interface Item {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "text" | "image";
  path: string;
  tags: string[];
  updated: string;
}
interface Library {
  version: string;
  updated: string;
  items: Item[];
}
interface UploadEntry {
  file: File;
  dataUrl: string;
  item: Item;
}

const App = () => {
  const [data, setData] = useState<Library | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [modalItem, setModalItem] = useState<Item | null>(null);
  const [modalContent, setModalContent] = useState(" ");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [manage, setManage] = useState(false);
  const [uploads, setUploads] = useState<UploadEntry[]>([]);

  useEffect(() => {
    fetch("library.json")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load library.json");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const filtered =
    data?.items.filter((item) => {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }) || [];

  const openItem = (item: Item) => {
    if (item.type === "pdf") {
      window.open(item.path, "_blank");
    } else if (item.type === "text") {
      fetch(item.path)
        .then((r) => r.text())
        .then((t) => {
          setModalContent(t);
          setModalItem(item);
        });
    } else if (item.type === "image") {
      setModalContent(item.path);
      setModalItem(item);
    }
  };

  const closeModal = () => {
    setModalItem(null);
    setModalContent(" ");
  };

  const prevent = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const slug = file.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        let type: Item["type"] = "pdf";
        if (file.type.startsWith("text")) type = "text";
        else if (file.type.startsWith("image")) type = "image";
        const item: Item = {
          id: slug,
          title: file.name,
          description: "",
          type,
          path: `files/${slug}`,
          tags: [],
          updated: new Date().toISOString(),
        };
        setUploads((u) => [...u, { file, dataUrl: reader.result as string, item }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const updateUpload = (idx: number, field: string, value: string) => {
    setUploads((us) => {
      const copy = [...us];
      if (field === "title") copy[idx].item.title = value;
      if (field === "description") copy[idx].item.description = value;
      if (field === "tags")
        copy[idx].item.tags = value
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      return copy;
    });
  };

  const addUploadToLibrary = (idx: number) => {
    if (!data) return;
    const item = uploads[idx].item;
    setData({ ...data, items: [...data.items, item] });
  };

  const downloadLibrary = () => {
    if (!data) return;
    const updated = { ...data, updated: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(updated, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "library.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="hero">
        <h1>NovaOS Library</h1>
      </div>
      <div className="controls">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="grid">
        {filtered.map((item) => (
          <div key={item.id} className="card" onClick={() => openItem(item)}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="tags">
              {item.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {modalItem && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{modalItem.title}</h3>
            {modalItem.type === "text" ? (
              <pre>{modalContent}</pre>
            ) : (
              <img src={modalContent} alt={modalItem.title} />
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      <button className="manage-toggle" onClick={() => setManage((m) => !m)}>
        {manage ? "Close" : "Manage"}
      </button>
      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "Light" : "Dark"}
      </button>
      <div className={"manage-panel" + (manage ? " open" : "") }>
        <h2>Manage</h2>
        <div
          className="drop-zone"
          onDragOver={prevent}
          onDragEnter={prevent}
          onDrop={handleDrop}
        >
          Drop files here
        </div>
        {uploads.map((u, idx) => (
          <div key={idx} className="upload">
            <div>Path: {u.item.path}</div>
            <input
              value={u.item.title}
              onChange={(e) => updateUpload(idx, "title", e.target.value)}
              placeholder="Title"
            />
            <textarea
              value={u.item.description}
              onChange={(e) => updateUpload(idx, "description", e.target.value)}
              placeholder="Description"
            />
            <input
              value={u.item.tags.join(",")}
              onChange={(e) => updateUpload(idx, "tags", e.target.value)}
              placeholder="tag1,tag2"
            />
            <a href={u.dataUrl} download={u.file.name}>
              Download file
            </a>
            <button onClick={() => addUploadToLibrary(idx)}>Add to library</button>
          </div>
        ))}
        <button onClick={downloadLibrary}>Download updated library.json</button>
        <p style={{ fontSize: "0.8rem", marginTop: "1rem" }}>
          After downloading, upload files under /public/files/ then commit.
        </p>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);