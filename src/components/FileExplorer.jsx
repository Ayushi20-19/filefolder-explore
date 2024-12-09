import React, { useState, useRef } from "react";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import {
  RiFileAddLine,
  RiFolderAddLine,
  RiDeleteBin5Line,
} from "react-icons/ri";
import { FiFileText } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import "./fileExplorer.css";

export const FileExplorer = ({ data, level = 0, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(data.name);
  const inputRef = useRef(null);

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") {
      data.name = editedName; // Update the data with the new name
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    setShowInput(false);
  };

  const isFolder = data.children !== undefined;

  return (
    <>
      <div className="sidebar">
        <ol style={{ paddingLeft: `${level * 20}px` }}>
          <li>
            <span className="item" onClick={handleClick}>
              {isFolder ? (
                isExpanded ? (
                  <HiChevronDown />
                ) : (
                  <HiChevronRight />
                )
              ) : (
                <FiFileText />
              )}
              {isFolder ? (
                <span
                  className="folder"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {isEditing ? (
                    <input
                      type="text"
                      ref={inputRef}
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      onKeyDown={handleEditKeyPress}
                      onBlur={handleBlur} // Close editing on blur
                      className="input"
                      autoFocus
                    />
                  ) : (
                    data.name
                  )}
                  <span className="buttonsWrapper">
                    <button onClick={handleAddFile} className="buttons">
                      <RiFileAddLine />
                      <span className="tooltip">Add File</span>
                    </button>
                    <button onClick={handleAddFolder} className="buttons">
                      <RiFolderAddLine />
                      <span className="tooltip">Add Folder</span>
                    </button>
                    <button onClick={handleEdit} className="buttons">
                      <FaRegEdit />
                      <span className="tooltip">Edit</span>
                    </button>
                    <button
                      onClick={() => onDelete(data.id)}
                      className="buttons"
                    >
                      <RiDeleteBin5Line />
                      <span className="tooltip">Delete</span>
                    </button>
                  </span>
                </span>
              ) : (
                <span className="file">
                  {isEditing ? (
                    <input
                      type="text"
                      ref={inputRef}
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      onKeyDown={handleEditKeyPress}
                      onBlur={handleBlur} // Close editing on blur
                      className="input"
                      autoFocus
                    />
                  ) : (
                    data.name
                  )}
                  <button onClick={handleEdit} className="buttons">
                    <FaRegEdit />
                    <span className="tooltip">Edit</span>
                  </button>
                  <button onClick={() => onDelete(data.id)} className="buttons">
                    <RiDeleteBin5Line />
                    <span className="tooltip">Delete</span>
                  </button>
                </span>
              )}
            </span>
            {showInput && (
              <div className="inputWrapper">
                <input
                  className="input"
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Enter new item name"
                />
                <div>
                  <button
                    onClick={handleAddItem}
                    className="buttons"
                    tooltip="Add"
                  >
                    <IoMdAdd />
                    <span className="tooltip">Save</span>
                  </button>
                  <button
                    onClick={() => setShowInput(false)}
                    className="buttons"
                  >
                    <RxCross2 />
                    <span className="tooltip">Cancel</span>
                  </button>
                </div>
              </div>
            )}
          </li>
        </ol>
        {isExpanded &&
          data.children &&
          data.children.map((child) => (
            <FileExplorer
              key={child.id}
              data={child}
              level={level + 1}
              onDelete={onDelete}
            />
          ))}
      </div>
    </>
  );
};
