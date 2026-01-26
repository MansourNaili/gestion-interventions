const API_URL = "http://localhost:5000/api/interventions";

export const getInterventions = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addIntervention = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateIntervention = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteIntervention = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};