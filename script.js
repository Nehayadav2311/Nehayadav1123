(function () {

  // ---------- DOCTORS DATABASE ----------

  const doctors = [
    {
      name: "Dr. Elena Voss",
      specialty: "Cardiology",
      dept: "cardiology",
      avatar: "💓",
      id: 1
    },
    {
      name: "Dr. James Keller",
      specialty: "Neurology",
      dept: "neurology",
      avatar: "🧠",
      id: 2
    },
    {
      name: "Dr. Priya Mehta",
      specialty: "Dental surgery",
      dept: "dental",
      avatar: "🦷",
      id: 3
    },
    {
      name: "Dr. Robert Chen",
      specialty: "Pulmonology",
      dept: "pulmonology",
      avatar: "🫁",
      id: 4
    },
    {
      name: "Dr. Lisa Greenwood",
      specialty: "Cardiology",
      dept: "cardiology",
      avatar: "💓",
      id: 5
    },
    {
      name: "Dr. Omar Farid",
      specialty: "Orthopaedics",
      dept: "ortho",
      avatar: "🦴",
      id: 6
    },
    {
      name: "Dr. Sarah Voss",
      specialty: "Neurology",
      dept: "neurology",
      avatar: "🧠",
      id: 7
    },
    {
      name: "Dr. Miguel Rios",
      specialty: "Gastroenterology",
      dept: "gastro",
      avatar: "🫀",
      id: 8
    },
    {
      name: "Dr. Nina Kowalski",
      specialty: "Dermatology",
      dept: "derma",
      avatar: "🧴",
      id: 9
    },
    {
      name: "Dr. Clara Hughes",
      specialty: "Pediatrics",
      dept: "peds",
      avatar: "👶",
      id: 10
    },
    {
      name: "Dr. Wei Zhang",
      specialty: "Ophthalmology",
      dept: "eye",
      avatar: "👁️",
      id: 11
    },
    {
      name: "Dr. Anita Desai",
      specialty: "Endocrinology",
      dept: "endocrine",
      avatar: "⚕️",
      id: 12
    }
  ];

  // ---------- RENDER DOCTORS ----------

  const docsGrid =
    document.getElementById("doctorsGrid");

  function renderDoctors() {

    let html = "";

    doctors.forEach((d) => {

      html += `
      <div class="doctor-card">

        <div class="doc-avatar">
          ${d.avatar}
        </div>

        <h4>${d.name}</h4>

        <div class="specialty">
          ${d.specialty}
        </div>

        <div class="dept-tag">
          🏛️ ${d.dept}
        </div>

        <div
          style="
            margin-top:0.8rem;
            color:#1f6f94;
          ">
          ⭐ 4.8 · available
        </div>

      </div>
      `;
    });

    docsGrid.innerHTML = html;
  }

  renderDoctors();

  // ---------- POPULATE DOCTOR DROPDOWN ----------

  const docSelect =
    document.getElementById("doctorSelect");

  doctors.forEach((doc) => {

    const option =
      document.createElement("option");

    option.value =
      doc.name + "|" + doc.specialty;

    option.textContent =
      doc.name + " — " + doc.specialty;

    docSelect.appendChild(option);
  });

  // ---------- TIME SLOTS ----------

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:15 AM",
    "11:00 AM",
    "11:45 AM",
    "01:30 PM",
    "02:15 PM",
    "03:00 PM",
    "03:45 PM",
    "04:30 PM"
  ];

  const container =
    document.getElementById(
      "timeSlotsContainer"
    );

  let selectedSlot = null;

  // ---------- RENDER TIME SLOT BUTTONS ----------

  timeSlots.forEach((slot) => {

    const btn =
      document.createElement("button");

    btn.className = "slot-btn";
    btn.textContent = slot;

    btn.addEventListener(
      "click",
      function () {

        document
          .querySelectorAll(".slot-btn")
          .forEach((b) =>
            b.classList.remove("selected")
          );

        this.classList.add("selected");

        selectedSlot = slot;

        document.getElementById(
          "slipTime"
        ).innerText = selectedSlot;

        document.getElementById(
          "liveMessage"
        ).innerHTML =
          `✅ time selected: ${selectedSlot} · now book`;
      }
    );

    container.appendChild(btn);
  });

  // ---------- DEFAULT SLOT ----------

  setTimeout(() => {

    const firstBtn =
      document.querySelector(".slot-btn");

    if (firstBtn) {

      firstBtn.classList.add(
        "selected"
      );

      selectedSlot = timeSlots[0];

      document.getElementById(
        "slipTime"
      ).innerText = selectedSlot;
    }

  }, 100);

  // ---------- BOOKING ID ----------

  function generateBookingID() {

    return (
      "MC-" +
      Math.floor(
        1000 + Math.random() * 9000
      ) +
      "-" +
      new Date()
        .getFullYear()
        .toString()
        .slice(-2)
    );
  }

  // ---------- REFRESH SLIP ----------

  function refreshSlip() {

    document.getElementById(
      "slipName"
    ).innerText =
      document.getElementById(
        "patientName"
      ).value || "—";

    const docVal =
      document.getElementById(
        "doctorSelect"
      ).value;

    const docName =
      docVal.split("|")[0] || "—";

    document.getElementById(
      "slipDoctor"
    ).innerText = docName;

    document.getElementById(
      "slipDate"
    ).innerText =
      document.getElementById(
        "appDate"
      ).value || "—";

    document.getElementById(
      "slipReason"
    ).innerText =
      document.getElementById(
        "reason"
      ).value || "—";
  }

  // ---------- LIVE INPUT LISTENERS ----------

  document
    .getElementById("patientName")
    .addEventListener(
      "input",
      refreshSlip
    );

  document
    .getElementById("doctorSelect")
    .addEventListener(
      "change",
      refreshSlip
    );

  document
    .getElementById("appDate")
    .addEventListener(
      "change",
      refreshSlip
    );

  document
    .getElementById("reason")
    .addEventListener(
      "input",
      refreshSlip
    );

  // ---------- BOOK BUTTON ----------

  const bookBtn =
    document.getElementById(
      "bookAppointmentBtn"
    );

  const liveMsg =
    document.getElementById(
      "liveMessage"
    );

  const slipIDSpan =
    document.getElementById(
      "slipID"
    );

  bookBtn.addEventListener(
    "click",
    function (e) {

      e.preventDefault();

      const name =
        document.getElementById(
          "patientName"
        ).value.trim();

      const email =
        document.getElementById(
          "patientEmail"
        ).value.trim();

      const docSel =
        document.getElementById(
          "doctorSelect"
        ).value;

      const date =
        document.getElementById(
          "appDate"
        ).value;

      if (
        !name ||
        !email ||
        !docSel ||
        !date ||
        !selectedSlot
      ) {

        liveMsg.innerHTML =
          "⚠️ please fill all fields and select time slot.";

        liveMsg.style.background =
          "#fff0e0";

        return;
      }

      if (
        !email.includes("@") ||
        !email.includes(".")
      ) {

        liveMsg.innerHTML =
          "📧 enter valid email.";

        liveMsg.style.background =
          "#fff0e0";

        return;
      }

      const newID =
        generateBookingID();

      slipIDSpan.innerText =
        newID;

      document.getElementById(
        "slipTime"
      ).innerText =
        selectedSlot;

      refreshSlip();

      liveMsg.innerHTML =
        `🎉 booked! ID ${newID} — slip updated & email sent to ${email}`;

      liveMsg.style.background =
        "#d8f0dc";

      const slip =
        document.getElementById(
          "slipCard"
        );

      slip.style.transition =
        "0.2s";

      slip.style.transform =
        "translateZ(60px) rotateY(1.5deg)";

      setTimeout(() => {

        slip.style.transform = "";

      }, 200);
    }
  );

  // ---------- INITIAL LOAD ----------

  refreshSlip();

  if (!selectedSlot) {

    selectedSlot = "09:00 AM";

    document
      .querySelector(".slot-btn")
      ?.classList.add("selected");

    document.getElementById(
      "slipTime"
    ).innerText =
      "09:00 AM";
  }

})();