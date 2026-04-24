import PropertyCard from "../../components/property/PropertyCard";
import { getProperties } from "../../api/property";
import { useEffect, useState } from "react";
import type { PropertyTypesView } from "../../pages/property/Propertytypes";
import { addFavorite, removeFavorite } from "../../api/favorite";
import { useUserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import SkeletonLoading from "../../components/common/SkeletonLoading";

const Home = () => {
  const navigate = useNavigate();
  const { userData } = useUserData();

  const [loading, setLoading] = useState<boolean>(true);
  const [properties, setProperties] = useState<PropertyTypesView[]>([]);

  const [updatingFavorites, setUpdatingFavorites] = useState<string[]>([]);

  const handleFavorite = async (propertyId: string) => {
    if (!userData.isAuthenticated) {
      navigate("/login");
      return;
    }

    if (updatingFavorites.includes(propertyId)) return;

    setUpdatingFavorites((prev) => [...prev, propertyId]);

    try {
      const isFavorite = properties.find(
        (property) => property.id === propertyId,
      )?.isFavorite;

      const res = !isFavorite
        ? await addFavorite(propertyId)
        : await removeFavorite(propertyId);

      if (res.success) {
        setProperties((prev) =>
          prev.map((property) =>
            property.id === propertyId
              ? { ...property, isFavorite: !property.isFavorite }
              : property,
          ),
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingFavorites((prev) => prev.filter((id) => id !== propertyId));
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await getProperties();

        if (res.success) {
          setProperties(res.properties);
        }
      } catch (e: any) {
        console.error("Error fetching properties:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) {
    return <SkeletonLoading />;
  }

  return (
    <div className="h-[90vh] active bg-dark-800 overflow-y-auto">
      <div className="p-8">
        {/* Search Bar */}
        <div className="bg-dark-700 border border-white/10 rounded-[40px] flex items-center mb-8 overflow-hidden">
          <div className="flex-1 px-5 py-[14px] border-r border-white/[0.08]">
            <div className="text-[10px] text-muted-faint uppercase tracking-widest mb-1">
              Location
            </div>
            <div className="text-[13px] text-[#e8e6e1]">Quezon City, PH</div>
          </div>
          <div className="flex-1 px-5 py-[14px] border-r border-white/[0.08]">
            <div className="text-[10px] text-muted-faint uppercase tracking-widest mb-1">
              Check-in
            </div>
            <div className="text-[13px] text-[#e8e6e1]">Mar 31, 2026</div>
          </div>
          <div className="flex-1 px-5 py-[14px] border-r border-white/[0.08]">
            <div className="text-[10px] text-muted-faint uppercase tracking-widest mb-1">
              Checkout
            </div>
            <div className="text-[13px] text-[#e8e6e1]">Apr 2, 2026</div>
          </div>
          <div className="flex-1 px-5 py-[14px]">
            <div className="text-[10px] text-muted-faint uppercase tracking-widest mb-1">
              Guests
            </div>
            <div className="text-[13px] text-[#e8e6e1]">2 guests</div>
          </div>
          <button className="bg-gold w-11 h-11 rounded-full mx-[7px] flex items-center justify-center text-[16px] text-dark-900 flex-shrink-0 cursor-pointer border-none hover:bg-gold-light transition-colors">
            →
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button className="s-chip active px-[14px] py-[6px] rounded-[20px] border border-white/[0.12] text-[12px] text-muted cursor-pointer bg-transparent hover:bg-gold/15 hover:border-gold hover:text-gold transition-all">
            All
          </button>
          <button className="s-chip px-[14px] py-[6px] rounded-[20px] border border-white/[0.12] text-[12px] text-muted cursor-pointer bg-transparent hover:bg-gold/15 hover:border-gold hover:text-gold transition-all">
            Apartment
          </button>
          <button className="s-chip px-[14px] py-[6px] rounded-[20px] border border-white/[0.12] text-[12px] text-muted cursor-pointer bg-transparent hover:bg-gold/15 hover:border-gold hover:text-gold transition-all">
            Condo
          </button>
          <button className="s-chip px-[14px] py-[6px] rounded-[20px] border border-white/[0.12] text-[12px] text-muted cursor-pointer bg-transparent hover:bg-gold/15 hover:border-gold hover:text-gold transition-all">
            House
          </button>
          <button className="s-chip px-[14px] py-[6px] rounded-[20px] border border-white/[0.12] text-[12px] text-muted cursor-pointer bg-transparent hover:bg-gold/15 hover:border-gold hover:text-gold transition-all">
            Villa
          </button>
          <button className="s-chip ml-auto flex items-center gap-1 px-[14px] py-[6px] rounded-[20px] border border-white/[0.12] text-[12px] text-muted cursor-pointer bg-transparent hover:bg-gold/15 hover:border-gold hover:text-gold transition-all">
            ⚙ Filters
          </button>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {properties?.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              actions={{ onFavorite: handleFavorite }}
              settings={{ mode: "home" }}
            />
          ))}
        </div>

        {!properties.length && (
          <div>
            <h1 className="text-[#e8e6e1]">No Properties yet!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
