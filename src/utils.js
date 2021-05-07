const boxOrBtn = (e) => {
  if (e.target.classList.contains("box")) {
    return "box";
  }
  if (e.target.classList.contains("btn")) {
    return "btn";
  }
};

export { boxOrBtn };
