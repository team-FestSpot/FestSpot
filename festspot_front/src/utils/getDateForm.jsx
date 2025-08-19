import React from "react";

export const getDateDashForm = (localDate) => {
  if (localDate.includes(".")) {
    return localDate.replace(/\./g, "-");
  }
  return `${localDate.slice(0, 4)}-${localDate.slice(4, 6)}-${localDate.slice(
    6,
    8
  )}`;
};

export const getTommorowDateDashForm = (localDate) => {
  let formatted;

  if (localDate.includes(".")) {
    formatted = localDate.replace(/\./g, "-");
  } else if (localDate.includes("-")) {
    formatted = localDate;
  } else {
    formatted = `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`;
  }

  const date = new Date(formatted);
  date.setDate(date.getDate() + 1);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getYesterdayDateDashForm = (localDate) => {
  let formatted;

  if (localDate.includes(".")) {
    formatted = localDate.replace(/\./g, "-");
  } else if (localDate.includes("-")) {
    formatted = localDate;
  } else {
    formatted = `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`;
  }

  const date = new Date(formatted);
  date.date.setDate(date.getDate() - 1);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getDateDotForm = (localDate) => {
  if (localDate.includes("-")) {
    return localDate.replace(/\-/g, ".");
  }
  return `${localDate.slice(0, 4)}.${localDate.slice(4, 6)}.${localDate.slice(
    6,
    8
  )}`;
};
