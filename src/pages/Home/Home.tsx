import PropertyCard from "../../components/property/PropertyCard";
import { getProperties } from "../../api/property";
import { useEffect, useState } from "react";
import type { PropertyTypesView } from "../../pages/property/Propertytypes";
import { addFavorite, removeFavorite } from "../../api/favorite";
import { useUserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import SkeletonLoading from "../../components/common/SkeletonLoading";
import DatePicker from "react-datepicker";

const Home = () => {
  const navigate = useNavigate();
  const { userData } = useUserData();

  const [loading, setLoading] = useState<boolean>(true);
  const [properties, setProperties] = useState<PropertyTypesView[]>([]);
  const [updatingFavorites, setUpdatingFavorites] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Search Bar
  const [address, setAddress] = useState<string>("");
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [minGuests, setMinGuests] = useState<number>(1);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [activeField, setActiveField] = useState<string | null>(null);

  const toggleField = (field: string | null) => {
    setActiveField((prev) => (prev === field ? null : field));
  };

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

  const fetchProperties = async () => {
    try {
      const res = await getProperties(
        currentPage + 1,
        address,
        checkIn,
        checkOut,
        minGuests,
        minPrice,
        maxPrice,
      );

      if (res.success) {
        setProperties(res.properties.content);
        setCurrentPage(res.properties.pageable.pageNumber);
        setTotalPages(res.properties.totalPages);
      }
    } catch (e: any) {
      console.error("Error fetching properties:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [currentPage]);

  if (loading) {
    return <SkeletonLoading />;
  }

  return (
    <div
      className="h-[90vh] active bg-dark-800 overflow-y-auto"
      onClick={() => setActiveField(null)}
    >
      <div className="p-8">
        {/* Search Bar */}
        <div className="relative flex items-stretch bg-dark-700 border border-white/[0.08] rounded-[56px] overflow-visible mb-8">
          {/* City */}
          <div
            className={`relative flex-1 px-5 py-[10px] border-r border-white/[0.07] cursor-pointer transition-colors rounded-l-[56px] ${activeField === "location" ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"}`}
            onClick={(e) => {
              toggleField("location");
              e.stopPropagation();
            }}
          >
            <div className="text-[10px] text-muted-faint uppercase tracking-widest mb-1">
              City
            </div>
            <div
              className={`text-[13px] ${address ? "text-[#e8e6e1]" : "text-[#4a4846]"}`}
            >
              {address || "Where are you going?"}
            </div>
            {activeField === "location" && (
              <div
                className="absolute top-[calc(100%+10px)] left-0 min-w-[240px] bg-dark-600 border border-white/10 rounded-[20px] z-20 overflow-hidden animate-fadeIn shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-[18px_20px]">
                  <div className="text-[11px] uppercase tracking-widest text-muted-faint mb-[10px]">
                    Destination
                  </div>
                  <input
                    autoFocus
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="City, neighborhood…"
                    className="w-full bg-dark-800 border border-white/10 rounded-xl px-[14px] py-[10px] text-[14px] text-[#e8e6e1] outline-none focus:border-gold/50 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Check-in */}
          <div
            className={`relative flex-1 px-5 py-[10px] border-r border-white/[0.07] cursor-pointer transition-colors z-10`}
          >
            <div className="text-[10px] text-muted-faint uppercase tracking-widest mb-1">
              Check-in
            </div>
            <DatePicker
              onChange={(date) => {
                if (!date) return;
                setCheckIn(date);
              }}
              placeholderText={
                checkIn
                  ? checkIn.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Select Date"
              }
              selectsStart
              minDate={new Date()}
              className="text-[13px] text-[#e8e6e1] outline-none cursor-pointer"
              wrapperClassName="relative z-20"
            />
          </div>

          {/* Checkout */}
          <div
            className={`relative flex-1 px-5 py-[10px] border-r border-white/[0.07] cursor-pointer transition-colors z-10`}
          >
            <div className="text-[10px] text-muted-faint uppercase tracking-widest mb-1">
              Check-out
            </div>
            <DatePicker
              onChange={(date) => {
                if (!date) return;
                setCheckOut(date);
              }}
              placeholderText={
                checkOut
                  ? checkOut.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Select Date"
              }
              selectsStart
              minDate={checkIn ? checkIn : new Date()}
              className="text-[13px] text-[#e8e6e1] outline-none cursor-pointer z-100"
            />
          </div>

          {/* Guests */}
          <div
            className={`relative flex-1 px-5 py-[10px] border-r border-white/[0.07] cursor-pointer transition-colors z-100 ${activeField === "guests" ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"}`}
            onClick={() => toggleField("guests")}
          >
            <div className="text-[10px] text-muted-faint uppercase tracking-widest mb-1">
              Guests
            </div>
            <div className="flex items-center justify-between">
              <div className="text-[13px] text-[#e8e6e1]">Guests</div>
              <div className="flex items-center gap-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMinGuests((p) => Math.max(1, p - 1));
                  }}
                  disabled={minGuests <= 1}
                  className="w-[30px] h-[30px] rounded-full border border-white/15 bg-transparent text-[#e8e6e1] flex items-center justify-center hover:border-gold/60 hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  −
                </button>
                <span className="w-8 text-center text-[14px] text-[#e8e6e1]">
                  {minGuests}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMinGuests((p) => p + 1);
                  }}
                  className="w-[30px] h-[30px] rounded-full border border-white/15 bg-transparent text-[#e8e6e1] flex items-center justify-center hover:border-gold/60 hover:text-gold transition-all"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Price */}
          <div
            className={`relative flex-1 px-5 py-[10px] cursor-pointer transition-colors z-10 ${activeField === "price" ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"}`}
            onClick={(e) => {
              toggleField("price");
              e.stopPropagation();
            }}
          >
            <div className="text-[10px] text-muted-faint uppercase tracking-widest mb-1">
              Price
            </div>
            <div
              className={`text-[13px] ${minPrice || maxPrice ? "text-[#e8e6e1]" : "text-[#4a4846]"}`}
            >
              {minPrice || maxPrice
                ? minPrice && maxPrice
                  ? `₱${minPrice} - ₱${maxPrice}`
                  : minPrice
                    ? `₱${minPrice}+`
                    : `Up to ₱${maxPrice}`
                : "Any price"}
            </div>
            {activeField === "price" && (
              <div
                className="absolute top-[calc(100%+10px)] bg-dark-600 w-70 border border-white/10 rounded-[20px] z-20 overflow-hidden shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-[18px_20px] grid gap-y-1">
                  <div className="text-[11px] uppercase tracking-widest text-muted-faint">
                    Price range (₱/night)
                  </div>
                  <div className="flex gap-[10px]">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-muted-faint">
                        ₱
                      </span>
                      <input
                        type="number"
                        placeholder="Min"
                        value={minPrice ?? ""}
                        onChange={(e) =>
                          setMinPrice(
                            e.target.value ? Number(e.target.value) : null,
                          )
                        }
                        className="w-full bg-dark-800 border border-white/10 rounded-xl pl-6 pr-3 py-[9px] text-[13px] text-[#e8e6e1] outline-none focus:border-gold/50 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="flex gap-[10px]">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-muted-faint">
                        ₱
                      </span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice ?? ""}
                        onChange={(e) =>
                          setMaxPrice(
                            e.target.value ? Number(e.target.value) : null,
                          )
                        }
                        className="w-full bg-dark-800 border border-white/10 rounded-xl pl-6 pr-3 py-[9px] text-[13px] text-[#e8e6e1] outline-none focus:border-gold/50 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            className="bg-gold w-11 h-11 rounded-full mx-[8px] my-auto flex items-center justify-center flex-shrink-0 border-none hover:bg-gold-light transition-all hover:scale-105 cursor-pointer"
            onClick={fetchProperties}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#111"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          </button>
        </div>

        {/* Filter Chips */}
        {/* <div className="flex gap-2 mb-6 flex-wrap">
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
        </div> */}

        {/* Listings Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
          {properties.length > 0 ? (
            properties?.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                actions={{ onFavorite: handleFavorite }}
                settings={{ mode: "home" }}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <h1 className="text-xl text-[#e8e6e1]">No Properties Found</h1>
              <p className="text-gray-400 mt-2">
                It seems like there are no properties available at the moment.
                Check back later!
              </p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className="w-9 h-9 rounded-full border border-white/[0.12] text-muted text-[13px] flex items-center justify-center bg-transparent cursor-pointer hover:bg-gold/15 hover:border-gold hover:text-gold transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-white/[0.12] disabled:hover:text-muted"
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, i) => {
              const isActive = i === currentPage;
              const isNearCurrent = Math.abs(i - currentPage) <= 1;
              const isEdge = i === 0 || i === totalPages - 1;

              if (!isNearCurrent && !isEdge) {
                if (i === currentPage - 2 || i === currentPage + 2) {
                  return (
                    <span key={i} className="text-muted text-[12px] px-1">
                      …
                    </span>
                  );
                }
                return null;
              }

              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-9 h-9 rounded-full text-[13px] flex items-center justify-center transition-all cursor-pointer border ${
                    isActive
                      ? "bg-gold border-gold text-dark-900 font-semibold"
                      : "border-white/[0.12] text-muted bg-transparent hover:bg-gold/15 hover:border-gold hover:text-gold"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={currentPage === totalPages - 1}
              className="w-9 h-9 rounded-full border border-white/[0.12] text-muted text-[13px] flex items-center justify-center bg-transparent cursor-pointer hover:bg-gold/15 hover:border-gold hover:text-gold transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-white/[0.12] disabled:hover:text-muted"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
