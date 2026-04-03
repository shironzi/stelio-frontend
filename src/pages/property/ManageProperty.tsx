import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteProperty, getMyProperties } from "../../api/property";
import type { PropertyTypesView } from "../../pages/property/Propertytypes";
import { propertyData, useProperty } from "../../context/PropertyContext";
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";

const ManageProperty = () => {
  const navigate = useNavigate();
  const { setData } = useProperty();
  const [properties, setProperties] = useState<PropertyTypesView[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleOnDelete = async (propertyId: string | undefined) => {
    if (!propertyId) {
      throw new Error("Property ID is missing in search params");
    }

    const res = await deleteProperty(propertyId);
    console.log(res);

    if (res.success) {
      setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    }
  };

  const handleOnEdit = (propertyId: string | undefined) => {
    if (!propertyId) {
      throw new Error("Property ID is missing in search params");
    }

    navigate(`/property/edit/info/${propertyId}`);
  };

  useEffect(() => {
    setData(propertyData);

    const fetchProperties = async () => {
      const res = await getMyProperties();

      if (res.success) {
        setProperties(res?.properties ?? []);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="s-screen bg-dark-800 min-h-[520px]" id="sc-manage">
        <div className="p-8">
          <div className="flex items-center justify-between mb-5">
            <h1 className="font-serif text-[20px] text-[#e8e6e1]">
              Loading...
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="s-screen bg-dark-800 min-h-[520px]" id="sc-manage">
      <div className="p-8">
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-serif text-[20px] text-[#e8e6e1]">
            Manage Properties
          </h1>
        </div>

        <div className="flex gap-2.5 mb-5">
          <select className="bg-dark-700 border border-white/10 rounded-lg text-muted px-[14px] py-2 text-[12px] font-sans outline-none cursor-pointer">
            <option>Type: All</option>
            <option>Apartment</option>
            <option>Condo</option>
            <option>House</option>
          </select>
          <select className="bg-dark-700 border border-white/10 rounded-lg text-muted px-[14px] py-2 text-[12px] font-sans outline-none cursor-pointer">
            <option>Location: All</option>
            <option>Manila</option>
            <option>Cebu</option>
          </select>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div
                key={property.id}
                className="bg-dark-700 rounded-xl border border-white/[0.07] overflow-hidden"
              >
                <img
                  src={
                    typeof property.image[0] === "string"
                      ? property.image[0]
                      : "https://via.placeholder.com/400x200"
                  }
                  alt={property.title || "Property Image"}
                  className="w-full h-[160px] object-cover block"
                />
                <div className="p-4">
                  <div className="text-[14px] font-medium text-[#e8e6e1] mb-[3px]">
                    {property.title || "Property Title"}
                  </div>
                  <div className="text-[12px] text-gold mb-3">
                    {property.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PHP",
                    })}{" "}
                    <span className="text-muted-faint">/ night</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOnEdit(property.id)}
                      className="flex-1 py-[7px] rounded-[7px] text-[12px] font-sans cursor-pointer border border-white/10 bg-transparent text-muted flex items-center justify-center gap-1 hover:bg-white/[0.06] transition-all"
                    >
                      <FaPencil /> Edit
                    </button>
                    <button
                      onClick={() => handleOnDelete(property.id)}
                      className="flex-1 py-[7px] rounded-[7px] text-[12px] font-sans cursor-pointer border border-white/10 bg-transparent text-muted flex items-center justify-center gap-1 hover:bg-red-900/10 hover:border-red-500/30 hover:text-red-400 transition-all"
                    >
                      <FaRegTrashCan /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-dark-700 rounded-xl border border-white/[0.07] p-4 flex justify-center items-center">
              <h1 className="text-[#e8e6e1] text-[16px]">
                No property available
              </h1>
            </div>
          )}
          <div
            onClick={() => navigate("/property/form/")}
            className="rounded-xl border-2 border-dashed border-white/10 bg-transparent flex items-center justify-center min-h-[240px] cursor-pointer hover:border-white/20 transition-colors"
          >
            <div className="text-center text-muted-ghost">
              <div className="text-[28px] mb-2">+</div>
              <div className="text-[13px]">Add new property</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProperty;
