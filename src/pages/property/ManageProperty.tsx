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
      <div className="s-screen bg-dark-800 min-h-[520px] p-8">
        <h1 className="font-serif text-[20px] text-[#e8e6e1]">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="s-screen bg-dark-800 min-h-[520px] p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-[24px] text-white">My Properties</h2>

        <div className="flex gap-3">
          <select className="bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-[13px] text-muted outline-none">
            <option>All Types</option>
            <option>Condo</option>
            <option>House</option>
            <option>Villa</option>
          </select>

          <select className="bg-dark-700 border border-white/10 rounded-lg px-4 py-2 text-[13px] text-muted outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Maintenance</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div
              key={property.id}
              className="bg-dark-700 border border-white/[0.07] rounded-2xl overflow-hidden hover:border-gold/30 transition-all group"
            >
              {/* Image */}
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={
                    "url" in property.images[0]
                      ? property.images[0].url
                      : URL.createObjectURL(property.images[0])
                  }
                  alt={property.title || "Property Image"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Status badge (static for now) */}
                <div className="absolute top-3 right-3">
                  <span className="text-[11px] px-3 py-1 rounded-full backdrop-blur-sm bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-[16px] font-medium text-white mb-2">
                  {property.title || "Property Title"}
                </h3>

                <div className="text-[12px] text-muted-faint mb-4">
                  📍 Location
                </div>

                {/* Stats (placeholder since original logic doesn't have these) */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[10px] text-muted-faint mb-1">
                      Price
                    </div>
                    <div className="text-[14px] text-gold font-medium">
                      {property.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "PHP",
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-muted-faint mb-1">
                      Type
                    </div>
                    <div className="text-[14px] text-white font-medium">
                      {property.propertyType || "-"}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-muted-faint mb-1">
                      Status
                    </div>
                    <div className="text-[14px] text-white font-medium">
                      Live
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOnEdit(property.id)}
                    className="flex-1 bg-dark-900 border border-white/10 text-muted px-4 py-2 rounded-lg text-[12px] hover:bg-dark-800 transition-colors flex items-center justify-center gap-1"
                  >
                    <FaPencil /> Manage
                  </button>

                  <button
                    onClick={() => handleOnDelete(property.id)}
                    className="flex-1 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-lg text-[12px] hover:bg-red-500/20 transition-colors flex items-center justify-center gap-1"
                  >
                    <FaRegTrashCan /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-dark-700 rounded-xl border border-white/[0.07] p-6 text-center">
            <h1 className="text-[#e8e6e1] text-[16px]">
              No property available
            </h1>
          </div>
        )}

        {/* Add Property Card */}
        <div
          onClick={() => navigate("/property/form/")}
          className="bg-dark-700 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center min-h-[300px] hover:border-gold/30 transition-all cursor-pointer group"
        >
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-gold text-[24px]">+</span>
            </div>
            <h3 className="text-[16px] font-medium text-white mb-2">
              Add New Property
            </h3>
            <p className="text-[13px] text-muted-faint">
              List a new property to start earning
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProperty;
