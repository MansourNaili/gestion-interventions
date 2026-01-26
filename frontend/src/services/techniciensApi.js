const API_URL = "http://localhost:5000/api/techniciens";

export const getTechniciens = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addTechnicien = async (technicien) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(technicien),
  });
  return res.json();
};

export const updateTechnicien = async (id, technicien) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(technicien),
  });
  return res.json();
};

export const deleteTechnicien = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};