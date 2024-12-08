import React, { useState } from "react";
import fileIcon from "../asset/file.png";
import downArrowIcon from "../asset/down-arrow.png";
import rightArrowIcon from "../asset/right-arrow.png";
import addFileIcon from "../asset/add-file.png";
import newFolderIcon from "../asset/new-folder.png";
import addIcons from "../asset/add.png";
import deleteIcon from "../asset/delete.png";
export const FileExplorer = ({ data, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const handleAddItem = () => {
    if (selectedType === "file") {
      const newFile = {
        id: Math.floor(Math.random() * 1000),
        name: newItemName,
      };
      data.children.push(newFile);
    } else if (selectedType === "folder") {
      const newFolder = {
        id: Math.floor(Math.random() * 1000),
        name: newItemName,
        children: [],
      };
      data.children.push(newFolder);
      updateParentFolder(data);
    }
    setNewItemName("");
    setShowInput(false);
  };

  const updateParentFolder = (folder) => {
    if (folder.parent) {
      const parentIndex = folder.parent.children.findIndex(
        (child) => child.id === folder.id
      );
      if (parentIndex !== -1) {
        folder.parent.children[parentIndex] = folder;
        updateParentFolder(folder.parent);
      }
    }
  };

  const handleClick = () => {
    if (data.children && data.children.length > 0) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleAddFile = () => {
    setShowInput(true);
    setSelectedType("file");
  };

  const handleAddFolder = () => {
    setShowInput(true);
    setSelectedType("folder");
  };

  const isFolder = data.children !== undefined;

  return (
    <>
      <ol style={{ paddingLeft: `${level * 20}px` }}>
        <li>
          <span onClick={handleClick}>
            {isFolder ? (
              <img
                src={isExpanded ? downArrowIcon : rightArrowIcon}
                alt="Folder Icon"
                style={{ marginRight: "5px", height: "20px", width: "20px" }}
              />
            ) : (
              <img
                src={fileIcon}
                alt="File Icon"
                style={{ marginRight: "5px", height: "20px", width: "20px" }}
              />
            )}
            {isFolder ? (
              <span className="folder">
                {data.name}
                <button onClick={handleAddFile} className="buttons">
                  <img
                    src={addFileIcon}
                    alt="Add File Icon"
                    style={{ width: "16px", height: "16px" }}
                  />
                </button>
                <button onClick={handleAddFolder} className="buttons">
                  <img
                    src={newFolderIcon}
                    alt="New Folder Icon"
                    style={{ width: "16px", height: "16px" }}
                  />
                </button>
              </span>
            ) : (
              <span className="file">{data.name}</span>
            )}
          </span>
          {showInput && (
            <div>
              <input
                className="input"
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Enter new item name"
              />
              <button onClick={handleAddItem} className="buttons">
                {" "}
                <img
                  src={addIcons}
                  alt="Add"
                  style={{ width: "16px", height: "16px" }}
                />
              </button>
              <button onClick={() => setShowInput(false)} className="buttons">
                {" "}
                <img
                  src={deleteIcon}
                  alt="cancel"
                  style={{ width: "16px", height: "16px" }}
                />
              </button>
            </div>
          )}
        </li>
      </ol>
      {isExpanded &&
        data.children &&
        data.children.map((child) => (
          <FileExplorer data={child} level={level + 1} />
        ))}
    </>
  );
};
