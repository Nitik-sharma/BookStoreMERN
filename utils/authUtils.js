const cleanUpData = ({ title, author, publishYear }) => {
  return new Promise((resolve, reject) => {
    if ((!title || !author, !publishYear)) {
      reject("Missing cridional");
    }
    resolve();
  });
};
