export const initialData = [
  {
    id: 0,
    name: "Root",
    children: [
      {
        id: 1,
        name: "src", // This is a folder.
        children: [
          {
            id: 2,
            name: "test.doc", // This is a file inside the src folder.
          },
          {
            id: 3,
            name: "foldertest.txt", // This is a folder inside the src folder.
            children: [
              {
                id: 4,
                name: "fileTest.txt", // This is a file inside the foldertest folder.
              },
            ],
          },
        ],
      },
      {
        id: 5,
        name: "Documents", // This is a folder with children.
        children: [
          {
            id: 6,
            name: "Word.doc", // This is a file inside the Documents folder.
          },
          {
            id: 7,
            name: "test.ppt", // Another file inside Documents.
          },
        ],
      },
      {
        id: 8,
        name: "Downloads",
        children: [
          {
            id: 9,
            name: "hello.txt",
          },
          {
            id: 10,
            name: "Misc",
            children: [
              {
                id: 11,
                name: "test1.txt",
              },
              {
                id: 12,
                name: "test2.txt",
                children: [
                  {
                    id: 13,
                    name: "test11.txt",
                  },
                  {
                    id: 14,
                    name: "test22.txt",
                    children: [
                      {
                        id: 15,
                        name: "test111.txt",
                      },
                      {
                        id: 16,
                        name: "test222.txt",
                      },
                    ],
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
