export const data = [
  {
    id: 1,
    name: "README.md", // This is a file.
    children: [
      {
        id: 3,
        name: "00000.doc", // This is a file inside the Documents folder.
      },
      {
        id: 8,
        name: "test1.txt",
        children: [
          {
            id: 8,
            name: "test1.txt", // File inside Misc folder.
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Documents", // This is a folder with children.
    children: [
      {
        id: 3,
        name: "Word.doc", // This is a file inside the Documents folder.
      },
      {
        id: 4,
        name: "o.ppt", // Another file inside Documents.
      },
    ],
  },
  {
    id: 5,
    name: "Downloads", // This is another folder with its own children.
    children: [
      {
        id: 6,
        name: "hello.txt", // A file inside Downloads.
      },
      {
        id: 7,
        name: "Misc", // This is a subfolder inside Downloads.
        children: [
          {
            id: 8,
            name: "test1.txt", // File inside Misc folder.
          },
          {
            id: 9,
            name: "test2.txt", // Another file inside Misc.
            children: [
              {
                id: 8,
                name: "test1.txt", // File inside Misc folder.
              },
              {
                id: 9,
                name: "test2.txt", // Another file inside Misc.
                children: [
                  {
                    id: 8,
                    name: "test1.txt", // File inside Misc folder.
                  },
                  {
                    id: 9,
                    name: "test2.txt", // Another file inside Misc.
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
