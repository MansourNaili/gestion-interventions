const API_URL = "http://localhost:5000/api/incidents";

export const getIncidents = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addIncident = async (incident) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(incident),
  });
  return res.json();
};

export const deleteIncident = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
