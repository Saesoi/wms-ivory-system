import { useState, useEffect } from "react";
import "./Admin.css";
import Nav from "../../components/nav"

export default function Admin() {

  const [activePage, setActivePage] = useState("dashboard");
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [tables, setTables] = useState([]);
  const [showTableModal, setShowTableModal] =
  useState(false);
  const [newTable, setNewTable] =
    useState({
      table_name: "",
      capacity: "",
      table_type: "",
      status: "Available"
    });

  const [
    capacitySettings,
    setCapacitySettings
  ] = useState([]);

  const [customers, setCustomers] =
  useState([]);

  const [
    selectedCustomer,
    setSelectedCustomer
  ] = useState(null);

  const [
  announcements,
  setAnnouncements
  ] = useState([]);

  const [
    setShowAnnouncementModal
  ] = useState(false);

  const [
    newAnnouncement,
    setNewAnnouncement
  ] = useState({
    title: "",
    content: "",
    status: "Published"
  });

  const [
    editingAnnouncementId,
    setEditingAnnouncementId
  ] = useState(null);

  const [editingAnnouncement, setEditingAnnouncement] =
    useState(null);

  const [editingTable, setEditingTable] = useState(null);
  useEffect(() => {

    fetch(
      "http://localhost/api/get_all_reservations.php"
    )
      .then((response) => response.json())
      .then((data) => {
        setReservations(data);
      })
      .catch((error) => {
        console.error(error);
      });
    fetch(
      "http://localhost/api/get_tables.php"
    )
      .then((response) => response.json())
      .then((data) => {
        setTables(data);
      })
      .catch((error) => {
        console.error(error);
      });
    fetch(
      "http://localhost/api/get_customers.php"
    )
      .then((response) =>
        response.json()
      )
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => {
        console.error(error);
      });
    fetch(
      "http://localhost/api/get_announcements.php"
    )
      .then((res) => res.json())
      .then((data) => {

      setAnnouncements(data);

      setNewAnnouncement({
        title: "",
        content: "",
        status: "Published"
      });

    });
    fetch(
      "http://localhost/api/get_capacity_settings.php"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCapacitySettings(data);
      });

  }, []);

  const updateReservationStatus =
    async (id, status) => {

      try {

        const response = await fetch(
          "http://localhost/api/update_reservation_status.php",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              id,
              status
            })
          }
        );

        const result =
          await response.json();

        if(result.success){

          setReservations((prevReservations) =>
            prevReservations.map((r) =>
              r.id === id
                ? { ...r, status }
                : r
            )
          );

        }

      } catch(error){

        console.error(error);

      }

  };

  const deleteReservation =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this reservation?"
        );

      if(!confirmDelete) return;

      try {

        const response = await fetch(
          "http://localhost/api/delete_reservation.php",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              id
            })
          }
        );

        const result =
          await response.json();

        if(result.success){

          setReservations(
            reservations.filter(
              (r) => r.id !== id
            )
          );

        }

      } catch(error){

        console.error(error);

      }
  };

  const addTable = () => {
    fetch(
      "http://localhost/api/add_table.php",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify(
          newTable
        )
      }
    )
      .then(() => {

        fetch(
        "http://localhost/api/get_tables.php"
        )
        .then((res) => res.json())
        .then((data) => {
        setTables(data);
        });
        setShowTableModal(false);
        });
  };

  const deleteTable = (id) => {
  if(
    !window.confirm(
      "Delete this table?"
    )
  ) return;

  fetch(
    `http://localhost/api/delete_table.php?id=${id}`
    )
    .then(res => res.json())
    .then(() => {
      setTables(
        tables.filter(
          t => t.id !== id
        )
      );
    });
  };

  const updateTable = () => {
    fetch(
      "http://localhost/api/update_table.php",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          ...newTable,
          id: editingTable.id
        })
      }
    )
    .then(() => {

      fetch(
      "http://localhost/api/get_tables.php"
      )
      .then((res) => res.json())
      .then((data) => {
      setTables(data);
      });

      setShowTableModal(false);
      setEditingTable(null);

      });
  };

  const saveCapacity = () => {
    fetch(
      "http://localhost/api/save_capacity.php",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify(
          capacitySettings
        )
      }
    )
    .then(res => res.json())
    .then(data => {

      alert(
        "Capacity settings saved!"
      );
    });
  };

  const loadCapacity = (date) => {

    fetch(
      `http://localhost/api/get_capacity.php?date=${date}`
    )
    .then(res => res.json())
    .then(data => {

      if(data){

        setCapacitySettings({

          booking_date: date,

          max_table_bookings:
            data.max_table_bookings,

          max_event_bookings:
            data.max_event_bookings,

          full_venue_limit:
            data.full_venue_limit

        });

      }

    });

  };

  const addAnnouncement = (status) => {
    fetch(
      "http://localhost/api/add_announcement.php",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          ...newAnnouncement,
          status
        })
      }
    )
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setAnnouncements([
          {
            id: data.id,
            title:
              newAnnouncement.title,
            content:
              newAnnouncement.content,
            status,
            created_at:
              new Date()
                .toISOString()
          },
          ...announcements
        ]);
        setNewAnnouncement({
          title: "",
          content: "",
          status: "Published"
        });
      }
    });
  };

  const deleteAnnouncement = async (id) => {

  if (!window.confirm("Delete this announcement?"))
    return;

  try {

    const response = await fetch(
      "http://localhost/api/delete_announcement.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      }
    );

    const result = await response.json();
        if (result.success) {

          setAnnouncements(
            announcements.filter(
              (a) => a.id !== id
            )
          );

        }

      } catch (error) {

        console.error(error);

      }

    };

    const updateAnnouncement = () => {

      fetch(
        "http://localhost/api/update_announcement.php",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            id:
              editingAnnouncement.id,
            ...newAnnouncement
          })
        }
      )
      .then(res => res.json())
      .then(data => {

        if(data.success){

          fetch(
            "http://localhost/api/get_announcements.php"
          )
          .then(res => res.json())
          .then(data => {
            setAnnouncements(data);
          });

          setEditingAnnouncement(null);

          setNewAnnouncement({
            title: "",
            content: "",
            status: "Published"
          });

        }

      });

    };

  return (
    <>
    <Nav />
    <div className="admin-layout">

      {/* SIDEBAR */}
      <div className="dash-sidebar">

        <div
          className={`dash-nav-item ${
            activePage === "dashboard" ? "active" : ""
          }`}
          onClick={() => setActivePage("dashboard")}
        >
          <span class="dash-nav-icon">📊</span>
          Dashboard
        </div>

        <div
          className={`dash-nav-item ${
            activePage === "reservations" ? "active" : ""
          }`}
          onClick={() => setActivePage("reservations")}
        >
          <span class="dash-nav-icon">📅</span>
          Reservations
        </div>

        <div
          className={`dash-nav-item ${
            activePage === "calendar" ? "active" : ""
          }`}
          onClick={() => setActivePage("calendar")}
        >
          <span class="dash-nav-icon">📆</span>
          Calendar
        </div>

        <div
          className={`dash-nav-item ${
            activePage === "tables" ? "active" : ""
          }`}
          onClick={() => setActivePage("tables")}
        >
          <span class="dash-nav-icon">🪑</span>
          Tables & Venue
        </div>

        <div
          className={`dash-nav-item ${
            activePage === "capacity"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActivePage("capacity")
          }
        >
          <span class="dash-nav-icon">⚙️</span>
          Capacity Control
        </div>

        <div
          className={`dash-nav-item ${
            activePage === "customers" ? "active" : ""
          }`}
          onClick={() =>
            setActivePage("customers")
          }
        >
          <span class="dash-nav-icon">👥</span>
          Customers
        </div>
        <div

        className={`dash-nav-item ${
          activePage === "announcements"
            ? "active"
            : ""
        }`}
        onClick={() =>
          setActivePage("announcements")
        }
      >
        <span class="dash-nav-icon">📢</span>
        Announcements
      </div>

      <div
        className={`dash-nav-item ${
          activePage === "analytics"
            ? "active"
            : ""
        }`}
        onClick={() =>
          setActivePage("analytics")
        }
      >
        <span class="dash-nav-icon">📈</span>
        Analytics
      </div>
      <div
          className="dash-nav-item"
          style={{
            marginTop: "auto",
            position: "absolute",
            bottom: "20px",
            width: "220px"
          }}
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          <span className="dash-nav-icon">🚪</span>
          Logout
        </div>
        
    </div>

      {/* MAIN */}
      <div className="dash-main">

        {activePage === "dashboard" && (
          <Dashboard
            reservations={reservations}
            capacitySettings={capacitySettings}
            setActivePage={setActivePage}
          />
        )}

        {activePage === "reservations" && (
          <Reservations
            reservations={reservations}
            setSelectedReservation={setSelectedReservation}
            updateReservationStatus={updateReservationStatus}
            deleteReservation={deleteReservation}
          />
        )}

        {activePage === "calendar" && (
          <CalendarPage
            reservations={reservations}
          />
        )}

        {activePage === "tables" && (
          <TablesVenue 
            tables={tables}
            deleteTable={deleteTable}
            setShowTableModal={setShowTableModal}
            setEditingTable={setEditingTable}
            setNewTable={setNewTable}
          />
        )}

        {activePage === "capacity" && (
          <CapacityControl
            capacitySettings={capacitySettings}
            setCapacitySettings={setCapacitySettings}
            saveCapacity={saveCapacity}
            loadCapacity={loadCapacity}
          />
        )}

        {activePage === "customers" && (
          <Customers
            customers={customers}
            setSelectedCustomer={
              setSelectedCustomer
            }
          />
        )}

        {activePage === "announcements" && (
          <Announcements
            announcements={announcements}
            newAnnouncement={newAnnouncement}
            setNewAnnouncement={setNewAnnouncement}
            addAnnouncement={addAnnouncement}
            deleteAnnouncement={deleteAnnouncement}
            updateAnnouncement={updateAnnouncement}
            editingAnnouncement={editingAnnouncement}
            setEditingAnnouncement={setEditingAnnouncement}
          />
        )}

        {activePage === "analytics" && (
          <Analytics
            reservations={reservations}
          />
        )}

      </div>

    </div>
    {selectedReservation && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Reservation Details</h2>
          <p>
            <strong>Customer:</strong>
            {" "}
            {selectedReservation.fullname}
          </p>
          <p>
            <strong>Email:</strong>
            {" "}
            {selectedReservation.email}
          </p>
          <p>
            <strong>Type:</strong>
            {" "}
            {selectedReservation.reservation_type}
          </p>
          <p>
            <strong>Date:</strong>
            {" "}
            {selectedReservation.reservation_date}
          </p>
          <p>
            <strong>Time:</strong>
            {" "}
            {selectedReservation.reservation_time}
          </p>
          <p>
            <strong>Guests:</strong>
            {" "}
            {selectedReservation.guest_count}
          </p>
          <p>
            <strong>Status:</strong>
            {" "}
            {selectedReservation.status}
          </p>
          {selectedReservation.occasion_type && (
            <p>
              <strong>Occasion Type:</strong>{" "}
              {selectedReservation.occasion_type}
            </p>
          )}

          {selectedReservation.event_description && (
            <p>
              <strong>Event Description:</strong>{" "}
              {selectedReservation.event_description}
            </p>
          )}
          <p>
            <strong>Special Requests:</strong>
            {" "}
            {selectedReservation.special_requests}
          </p>

          <button
            className="btn-primary"
            onClick={() =>
              setSelectedReservation(null)
            }
          >
            Close
          </button>
        </div>
      </div>
    )}
    {showTableModal && (
      <div className="modal-overlay">
        <div className="modal">
          <h2>{editingTable
              ? "Edit Table"
              : "Add Table"}
          </h2>

          <input
            type="text"
            placeholder="Table Name"
            value={newTable.table_name}
            onChange={(e) =>
              setNewTable({
                ...newTable,
                table_name: e.target.value
              })
            }
          />

          <input
            type="text"
            placeholder="Capacity"
            value={newTable.capacity}
            onChange={(e) =>
              setNewTable({
                ...newTable,
                capacity: e.target.value
              })
            }
          />

          <select
            value={newTable.table_type}
            onChange={(e) =>
              setNewTable({
                ...newTable,
                table_type: e.target.value
              })
            }
          >
            <option value="">
              Select Type
            </option>

            <option value="Standard">
              Standard
            </option>

            <option value="Window">
              Window
            </option>

            <option value="Outdoor">
              Outdoor
            </option>

            <option value="VIP">
              VIP
            </option>

          </select>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "15px"
            }}
          >

            <button
              className="btn-primary"
              onClick={
                editingTable
                  ? updateTable
                  : addTable
              }
            >
              Save
            </button>

            <button
              onClick={() =>
                setShowTableModal(false)
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
    {selectedCustomer && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>
            Customer Details
          </h2>
          <p>
            <strong>Name:</strong>{" "}
            {selectedCustomer.fullname}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {selectedCustomer.email}
          </p>
          <p>
            <strong>Total Bookings:</strong>{" "}
            {selectedCustomer.total_bookings}
          </p>
          <p>
            <strong>Last Visit:</strong>{" "}
            {selectedCustomer.last_visit ||
              "No bookings"}
          </p>
          <button
            className="btn-primary"
            onClick={() =>
              setSelectedCustomer(null)
            }
          >
            Close
          </button>
        </div>
      </div>
    )}
    </>
  );
}

function Dashboard({
  reservations,
  capacitySettings,
  setActivePage
}) {
  const today =
    new Date()
    .toISOString()
    .split("T")[0];
  
  const todayCapacity =
    Array.isArray(capacitySettings)
      ? capacitySettings.find(
          (c) =>
            c.booking_date === today
        )
      : capacitySettings;

  const totalReservations =
    reservations.length;

  const todaysBookings =
    reservations.filter(
      (r) =>
        r.reservation_date === today
    ).length;

  const eventBookingsToday =
    reservations.filter(
      (r) =>
        r.reservation_date === today &&
        r.reservation_type === "occasion"
    ).length;

  const venueBookingsToday =
    reservations.filter(
      (r) =>
        r.reservation_date === today &&
        r.reservation_type === "venue"
    ).length;

  const tableLimit =
    todayCapacity
    ?.max_table_bookings || 0;

  const eventLimit =
    todayCapacity
    ?.max_event_bookings || 0;

  const venueLimit =
    todayCapacity
    ?.full_venue_limit ||
    "Available";

  const tableBookingsToday =
    reservations.filter(
      (r) =>
        r.reservation_date === today &&
        r.reservation_type === "table"
    ).length;
  
  const tablePercent =
    tableLimit > 0
    ? (
    tableBookingsToday /
    tableLimit
    ) * 100
    : 0;

    const eventPercent =
    eventLimit > 0
    ? (
    eventBookingsToday /
    eventLimit
    ) * 100
    : 0;
  

  const pendingApprovals =
    reservations.filter(
      (r) =>
        r.status === "Pending"
    ).length;

  const fullVenueBookings =
    reservations.filter(
      (r) =>
        r.reservation_type === "venue"
    ).length;

  return (
    <div>

      <div className="dash-header">
        <h1>
          Admin <span className="gold">Dashboard</span>
        </h1>

        <p>Overview for Today</p>
      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-num">{totalReservations}</div>
          <div className="stat-label">
            Total Reservations
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-num">{todaysBookings}</div>
          <div className="stat-label">
            Today's Bookings
          </div>
        </div>

        <div className="stat-card">
          <div
            className="stat-num"
            style={{ color: "orange" }}
          >
            {pendingApprovals}
          </div>

          <div className="stat-label">
            Pending Approvals
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-num">
            {fullVenueBookings}
          </div>

          <div className="stat-label">
            Full Venue Bookings
          </div>
        </div>

      </div>

      {/* CAPACITY */}
      <div className="capacity-grid">

        <div className="cap-card">

          <div className="cap-card-label">
            Table Bookings Today
          </div>

          <div className="cap-pct">
            {tableBookingsToday}/{tableLimit}
          </div>

          <div className="cap-bar-wrap">
            <div
              className="cap-bar"
              style={{ width:
              `${Math.min(
              tablePercent,
              100
              )}%` }}
            />
          </div>

          <div
            style={{
              fontSize: "11px",
              color: "var(--gray)"
            }}
          >
            {Math.round(
            tablePercent
            )}
            % capacity
          </div>

        </div>

        <div className="cap-card">

          <div className="cap-card-label">
            Event Bookings
          </div>

          <div className="cap-pct">
           {eventBookingsToday}/{eventLimit}
          </div>

          <div className="cap-bar-wrap">
            <div
              className="cap-bar"
              style={{ width:
              `${Math.min(
              eventPercent,
              100
              )}%` }}
            />
          </div>

          <div
            style={{
              fontSize: "11px",
              color: "var(--gray)"
            }}
          >
            {Math.round(
            eventPercent
            )}
            % capacity
          </div>

        </div>

        <div className="cap-card">

          <div className="cap-card-label">
            Full Venue
          </div>

          <div
            className="cap-pct"
            style={{
              color: "var(--green)"
            }}
          >
            {venueLimit}
          </div>

          <div className="cap-bar-wrap">
            <div
              className="cap-bar"
              style={{ width: "0%" }}
            />
          </div>

          <div
            style={{
              fontSize: "11px",
              color: "var(--gray)"
            }}
          >
            {venueBookingsToday > 0
            ? `${venueBookingsToday} booking(s)`
            : "No bookings"}
          </div>

        </div>

      </div>

      {/* RECENT RESERVATIONS */}
      <div className="dash-table-wrap">
        <div className="dash-table-head">
          <h3>
            Recent Reservations
          </h3>
          <button 
            className="action-btn action-btn-edit"
            onClick={() => setActivePage("reservations")}
          >
            View All
          </button>

        </div>

        <table>

          <thead>
            {reservations
              .slice(0, 5)
              .map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>
                {r.fullname}
              </td>
              <td>
                {r.email}
              </td>
              <td>
                {r.reservation_type}
              </td>
              <td>
                {r.reservation_date}
                {" "}
                {r.reservation_time}
              </td>
              <td>
                {r.guest_count}
              </td>
              <td>
                <span
                  className={`badge badge-${r.status.toLowerCase()}`}
                >
                  {r.status}
                </span>
              </td>
            </tr>
            ))}

          </thead>
        </table>
      </div>
    </div>
  );
}

function Reservations({
  reservations,
  setSelectedReservation,
  updateReservationStatus,
  deleteReservation
}) {

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [dateFilter, setDateFilter] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const filteredReservations =
  reservations.filter((r) => {

      const statusMatch =
        statusFilter === "All" ||
        r.status === statusFilter;

      const typeMatch =
        typeFilter === "All" ||
        r.reservation_type === typeFilter;

      const dateMatch =
        !dateFilter ||
        r.reservation_date === dateFilter;

      const searchMatch =
        !searchTerm ||

        r.fullname
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        r.email
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        String(r.id)
          .includes(searchTerm);

      return (
        statusMatch &&
        typeMatch &&
        dateMatch &&
        searchMatch
      );

  });
  return (
    <div>
      <div className="dash-header">
        <h1>
          Reservation <span className="gold">
            Management
          </span>
        </h1>
      </div>

      <div className="dash-table-wrap">
        <div className = "Filtlers">
          <div className="filters-row">
            <div className="filters-left">

              <input
                type="date"
                className="filter-input"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />

              <select
                className="filter-input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <select
                className="filter-input"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="table">Table</option>
                <option value="occasion">Occasion</option>
                <option value="full_venue">Full Venue</option>
              </select>

            </div>

            <div className="filters-right">

              <input
                type="text"
                className="filter-input"
                placeholder="Search customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>

          </div>
        </div>
        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Type</th>
              <th>Date & Time</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredReservations.map((r) => (

              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.fullname}</td>
                <td>{r.email}</td>
                <td>{r.reservation_type}</td>

                <td>
                  {r.reservation_date}
                  <br />
                  {r.reservation_time}
                </td>

                <td>{r.guest_count}</td>

                <td>
                  <span
                    className={`badge badge-${r.status.toLowerCase()}`}
                  >
                    {r.status}
                  </span>
                </td>

                <td>
                  <div className="action-btns">
                    <button
                      className="action-btn action-btn-edit"
                      onClick={() => setSelectedReservation(r)}
                    >
                      View
                    </button>

                    <button
                      className="action-btn action-btn-approve"
                      onClick={() => updateReservationStatus(r.id, "Approved")}
                    >
                      Approve
                    </button>

                    <button
                      className="action-btn action-btn-reject"
                      onClick={() => updateReservationStatus(r.id, "Rejected")}
                    >
                      Reject
                    </button>

                    <button
                      className="action-btn action-btn-delete"
                      onClick={() => deleteReservation(r.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

function CalendarPage({
  reservations
  
}) {

  const getReservationsForDay = (day) => {
    const dateString =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return reservations.filter(
      (r) => r.reservation_date === dateString
    );
  };

  const [currentMonth, setCurrentMonth] =
    useState(new Date());

  const changeMonth = (direction) => {

    const newMonth =
      new Date(currentMonth);

    newMonth.setMonth(
      currentMonth.getMonth() + direction
    );

    setCurrentMonth(newMonth);
  };

  const monthLabel =
    currentMonth.toLocaleDateString(
      "en-US",
      {
        month: "long",
        year: "numeric"
      }
    );

  const year = currentMonth.getFullYear();

  const month = currentMonth.getMonth();

  const firstDay =
    new Date(year, month, 1).getDay();

  const daysInMonth =
    new Date(year, month + 1, 0).getDate();

  const calendarDays = [];

  // Empty cells before day 1
  for (
    let i = 0;
    i < firstDay;
    i++
  ) {
    calendarDays.push(
      <div
        key={`empty-${i}`}
        className="cal-day empty"
      />
    );
  }

  // Actual days
  for (
  let day = 1;
  day <= daysInMonth;
  day++
) {

  const dayReservations =
    getReservationsForDay(day);

  const firstReservation =
    dayReservations[0];

    let bookingClass = "";

    if (firstReservation) {

      if (
        firstReservation.reservation_type ===
        "table"
      ) {
        bookingClass = "table-booking";
      }

      if (
        firstReservation.reservation_type ===
        "occasion"
      ) {
        bookingClass = "occasion-booking";
      }

      if (
        firstReservation.reservation_type ===
        "full_venue"
      ) {
        bookingClass = "full-venue";
      }

    }

  calendarDays.push(

    <div
      key={day}
      className={`cal-day ${
        bookingClass
      }`}
    >
      <>
        <div>{day}</div>

        {dayReservations.length > 0 && (
          <small>
            {dayReservations.length}
          </small>
        )}
      </>
    </div>

  );
}

  return (
    <div>

      <div className="dash-header">
        <h1>
          Calendar{" "}
          <span className="gold">
            View
          </span>
        </h1>
      </div>

      <div className="calendar-wrap">

        <div className="cal-header">

          <button
            className="cal-nav"
            onClick={() =>
              changeMonth(-1)
            }
          >
            ‹
          </button>

          <div className="cal-month">
            {monthLabel}
          </div>

          <button
            className="cal-nav"
            onClick={() =>
              changeMonth(1)
            }
          >
            ›
          </button>

        </div>

        {/* LEGEND */}

        <div
          style={{
            display: "flex",
            gap: "24px",
            marginBottom: "16px",
            fontSize: "11px",
            color: "white"
          }}
        >

          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background:
                  "var(--gold)",
                display: "inline-block"
              }}
            />
            Table
          </span>

          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background:
                  "var(--green)",
                display: "inline-block"
              }}
            />
            Occasion
          </span>

          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background:
                  "var(--red)",
                display: "inline-block"
              }}
            />
            Full Venue
          </span>
        </div>
        <div className="cal-grid">

          <div className="cal-day-name">S</div>
          <div className="cal-day-name">M</div>
          <div className="cal-day-name">T</div>
          <div className="cal-day-name">W</div>
          <div className="cal-day-name">T</div>
          <div className="cal-day-name">F</div>
          <div className="cal-day-name">S</div>

          {calendarDays}
        </div>
      </div>
    </div>
  );
}

function TablesVenue({
  tables,
  deleteTable,
  setShowTableModal,
  setEditingTable={setEditingTable},
  setNewTable={setNewTable}
}) {
  
  return (
    <div>
      <div className="dash-header">
        <h1>
          Tables &{" "}
          <span className="gold">
            Venue
          </span>
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px"
        }}
      >
        <button
          className="btn-primary"
          onClick={() =>
            setShowTableModal(true)
          }
        >
          + Add Table
        </button>
      </div>
      <div className="dash-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Table #</th>
              <th>Capacity</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <tr key={table.id}>
                <td>{table.table_name}</td>
                <td>{table.capacity}</td>
                <td>{table.table_type}</td>
                <td>
                  <span className="badge">
                    {table.status}
                  </span>
                </td>
                <td>
                  <div className="action-btns">
                    <button
                      className="action-btn action-btn-edit"
                      onClick={() => {

                        setEditingTable(table);

                        setNewTable({
                          table_name:
                            table.table_name,

                          capacity:
                            table.capacity,

                          table_type:
                            table.table_type,

                          status:
                            table.status
                        });

                        setShowTableModal(true);

                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn action-btn-delete"
                      onClick={() =>
                        deleteTable(table.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CapacityControl({
  capacitySettings,
  setCapacitySettings,
  saveCapacity,
  loadCapacity
}) {

  return (

    <div>

      <div className="dash-header">
        <h1>
          Capacity{" "}
          <span className="gold">
            Control
          </span>
        </h1>
      </div>

      <div
        style={{
          background: "var(--navy-mid)",
          padding: "40px",
          maxWidth: "600px"
        }}
      >
        <div className="form-group">

          <label className="form-label">
            Select Date
          </label>
          <input
            type="date"
            className="form-input"
            value={
              capacitySettings.booking_date
            }
            onChange={(e) => {

            const selectedDate =
              e.target.value;
            setCapacitySettings({
              ...capacitySettings,
              booking_date:
                selectedDate
            });
            loadCapacity(
              selectedDate
            );
          }}
          />
        </div>
        <div className="form-group">

          <label className="form-label">
            Max Table Bookings
          </label>

          <input
            type="number"
            className="form-input"
            value={
              capacitySettings.max_table_bookings
            }
            onChange={(e) =>
              setCapacitySettings({
                ...capacitySettings,
                max_table_bookings:
                  e.target.value
              })
            }
          />

        </div>

        <div className="form-group">

          <label className="form-label">
            Max Event Bookings
          </label>

          <input
            type="number"
            className="form-input"
            value={
              capacitySettings.max_event_bookings
            }
            onChange={(e) =>
              setCapacitySettings({
                ...capacitySettings,
                max_event_bookings:
                  e.target.value
              })
            }
          />

        </div>

        <div className="form-group">

          <label className="form-label">
            Full Venue Limit
          </label>

          <select
            className="form-select"
            value={
              capacitySettings.full_venue_limit
            }
            onChange={(e) =>
              setCapacitySettings({
                ...capacitySettings,
                full_venue_limit:
                  e.target.value
              })
            }
          >
            <option>
              1 per day
            </option>

            <option>
              Available
            </option>

            <option>
              Blocked
            </option>

          </select>

        </div>

        <div
          style={{
            padding: "16px",
            background:
              "rgba(39,174,96,0.08)",
            borderLeft:
              "3px solid var(--green)",
            color: "var(--green)",
            marginBottom: "24px"
          }}
        >
          ✅ Auto-block is active —
          venue will auto-close
          bookings when limits are
          reached.
        </div>

        <button
          className="btn-primary"
          onClick={saveCapacity}
        >
          Save Settings
        </button>

      </div>

    </div>

  );
}

function Customers({
  customers,
  setSelectedCustomer
}) {

  return (
    <div>

      <div className="dash-header">
        <h1>
          Customer{" "}
          <span className="gold">
            Management
          </span>
        </h1>
      </div>

      <div className="dash-table-wrap">

        <div className="dash-table-head">
          <h3>Customer List</h3>
        </div>

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Total Bookings</th>
              <th>Last Visit</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {customers.map(
              (customer) => (

                <tr
                  key={customer.id}
                >

                  <td>
                    {customer.fullname}
                  </td>

                  <td>
                    {customer.email}
                  </td>

                  <td>
                    {
                      customer.total_bookings
                    }
                  </td>

                  <td>
                    {
                      customer.last_visit ||
                      "No bookings"
                    }
                  </td>

                  <td>

                    <button
                      className="action-btn action-btn-edit"
                      onClick={() =>
                        setSelectedCustomer(
                          customer
                        )
                      }
                    >
                      View
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

function Announcements({
  announcements,
  newAnnouncement,
  setNewAnnouncement,
  addAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
  editingAnnouncement,
  setEditingAnnouncement
}) {

  return (
    <div>
      <div className="dash-header">
        <h1>
          Announcements{" "}
          <span className="gold">
            Manager
          </span>
        </h1>
      </div>
      {/* CREATE FORM */}
      <div className="announce-form">
        <div className="announce-form-title">
          Create New Announcement
        </div>
        <div className="form-group">
          <label className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Announcement title"
            value={newAnnouncement.title}
            onChange={(e) =>
              setNewAnnouncement({
                ...newAnnouncement,
                title: e.target.value
              })
            }
          />
        </div>
        <div className="form-group">
          <label className="form-label">
            Content
          </label>
          <textarea
            className="form-textarea"
            placeholder="Write your announcement..."
            value={newAnnouncement.content}
            onChange={(e) =>
              setNewAnnouncement({
                ...newAnnouncement,
                content: e.target.value
              })
            }
          />
        </div>
        <div
          style={{
            display: "flex",
            
            gap: "12px"
          }}
        >
          <button
            className="btn-primary"
            onClick={() => {

              if (editingAnnouncement) {

                updateAnnouncement();

              } else {

                addAnnouncement("Published");

              }

            }}
          >
            {editingAnnouncement
              ? "Update Announcement"
              : "Publish to Homepage"}
          </button>

          <button
            type="button"
            className="btn-outline"
            onClick={() =>
              addAnnouncement("Draft")
            }
          >
            Save Draft
          </button>
        </div>
      </div>
      {/* TABLE */}
      <div className="dash-table-wrap">
        <div className="dash-table-head">
          <h3>
            Published Announcements
          </h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.created_at}</td>
                <td>
                  <span
                    className={`badge badge-${(a.status || "draft").toLowerCase()}`}
                  >
                    {a.status || "Draft"}
                  </span>

                </td>
                <td>
                  <div className="action-btns">
                    <button
                      className="action-btn action-btn-edit"
                      onClick={() => {

                        setEditingAnnouncement(a);

                        setNewAnnouncement({
                          title: a.title,
                          content: a.content,
                          status: a.status
                        });

                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn action-btn-delete"
                      onClick={() =>
                        deleteAnnouncement(a.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Analytics({
  reservations,
}) {

  const totalReservations =
    reservations.length;
  const typeCounts = {};

  reservations.forEach((r) => {

    typeCounts[
      r.reservation_type
    ] =
      (typeCounts[
        r.reservation_type
      ] || 0) + 1;

  });

  const mostBookedType =
    Object.keys(typeCounts)
      .length > 0
      ? Object.keys(
          typeCounts
        ).reduce((a, b) =>
          typeCounts[a] >
          typeCounts[b]
            ? a
            : b
        )
      : "None";
  
  const hourCounts = {};

    reservations.forEach((r) => {

      if (!r.reservation_time)
        return;

      const hour =
        r.reservation_time
          .split(":")[0];

      hourCounts[hour] =
        (hourCounts[hour] || 0) + 1;

    });

    const peakHour =
      Object.keys(hourCounts)
        .length > 0
        ? Object.keys(
            hourCounts
          ).reduce((a, b) =>
            hourCounts[a] >
            hourCounts[b]
              ? a
              : b
          )
        : "--";

    const dailyCounts = {};

    reservations.forEach((r) => {

      const day =
        new Date(
          r.reservation_date
        ).getDate();

      dailyCounts[day] =
        (dailyCounts[day] || 0) + 1;

    });

  return (
  <div>
    <div className="dash-header">
      <h1>
        Analytics &{" "}
        <span className="gold">
          Reports
        </span>
      </h1>
    </div>
    <div
      className="stats-grid"
      style={{
        marginBottom: "32px"
      }}
    >
      <div className="stat-card">
        <div className="stat-num">
          {peakHour}:00
        </div>
        <div className="stat-label">
          Peak Hour
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-num">
          {mostBookedType}
        </div>
        <div className="stat-label">
          Most Booked Type
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-num">
          {totalReservations}
        </div>
        <div className="stat-label">
          Total Reservations
        </div>
      </div>
      <div className="stat-card">
        <div
          className="stat-num"
          style={{
            color:
              "var(--green)"
          }}
        >
          Live
        </div>
        <div className="stat-label">
          Reservation Data
        </div>
      </div>
    </div>
    <div
      style={{
        background:
          "var(--navy-mid)",
        padding: "32px",
        marginBottom: "24px"
      }}
    >
      <h3
        style={{
          fontFamily:
            "'Bebas Neue'",
          letterSpacing:
            "3px",
          color: "var(--gold)",
          marginBottom:
            "24px",
          fontSize: "14px"
        }}
      >
        Daily Reservations
      </h3>
      <div
        style={{
          display: "flex",
          alignItems:
            "flex-end",
          gap: "8px",
          height: "160px"
        }}
      >
        {Array.from(
          { length: 31 },
          (_, i) => {

            const count =
              dailyCounts[
                i + 1
              ] || 0;

            return (

              <div
                key={i}
                style={{
                  flex: 1,
                  display:
                    "flex",
                  flexDirection:
                    "column",
                  alignItems:
                    "center",
                  gap: "4px"
                }}
              >
                <div
                  title={`${count} reservations`}
                  style={{
                    background:
                      "var(--gold)",
                    width: "100%",
                    height:
                      `${count * 10}px`,
                    minHeight:
                      count > 0
                        ? "5px"
                        : "0"
                  }}
                />
                <div
                  style={{
                    fontSize:
                      "9px",
                    color:
                      "var(--gray)"
                  }}
                >
                  {i + 1}
                </div>

              </div>
            );
          }
        )}
      </div>
    </div>
  </div>
);
}