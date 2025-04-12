export function useVesselApi() {
  const updateVessel = async (id, data) => {
    const res = await fetch(`http://localhost:3000/api/vessels/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update");
    const { data: updated } = await res.json();
    return updated;
  };

  const deleteVesselById = async (id) => {
    const res = await fetch(`http://localhost:3000/api/vessels/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete");
  };

  return { updateVessel, deleteVesselById };
}
