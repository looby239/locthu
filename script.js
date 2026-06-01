document.addEventListener("DOMContentLoaded", () => {
  
  // ----------------------------------------------------
  // 1. STATE VARIABLES & CONFIG
  // ----------------------------------------------------
  const weddingDate = new Date("2027-04-30T09:00:00+07:00").getTime();
  
  // Gallery images list for lightbox
  const galleryImages = [
    "assets/gallery_1.webp",
    "assets/gallery_2.webp",
    "assets/gallery_3.webp",
    "assets/gallery_4.webp",
    "assets/gallery_5.webp",
    "assets/gallery_6.webp",
    "assets/gallery_7.webp",
    "assets/gallery_8.webp"
  ];
  let currentLightboxIndex = 0;
  
  // Cấu hình URL Web App Google Apps Script để lưu phản hồi RSVP vào Google Sheet
  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxz_pq6GLOALT-si4mhXVZ1DvOG4md2ktwPQxXSQhrBl5HJKsAnbjtYfK2Zv1zMc-o4/exec";

  // ----------------------------------------------------
  // 2. DOM ELEMENTS
  // ----------------------------------------------------
  const body = document.body;
  const envelopeOverlay = document.getElementById("envelope-overlay");
  const mainInvitation = document.getElementById("main-invitation");
  const btnOpenEnvelope = document.getElementById("btn-open-envelope");
  const btnOpenText = document.getElementById("btn-open-text");
  const heroSection = document.querySelector(".hero-section");
  const heroScrollBtn = document.getElementById("hero-scroll-btn");
  
  const weddingAudio = document.getElementById("wedding-audio");
  const musicBtn = document.getElementById("music-btn");
  const scrollTopBtn = document.getElementById("scroll-top-btn");
  
  // Modals
  const groomModal = document.getElementById("groom-modal");
  const brideModal = document.getElementById("bride-modal");
  const lightboxModal = document.getElementById("lightbox-modal");
  
  const btnGroomGift = document.getElementById("btn-groom-gift");
  const btnBrideGift = document.getElementById("btn-bride-gift");
  
  const groomModalClose = document.getElementById("groom-modal-close");
  const brideModalClose = document.getElementById("bride-modal-close");
  const lightboxClose = document.getElementById("lightbox-close");
  
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  
  // Forms & Lists
  const rsvpForm = document.getElementById("rsvp-form");
  const wishForm = document.getElementById("wish-form");
  const wishesList = document.getElementById("wishes-list");
  const toastContainer = document.getElementById("toast-container");

  // ----------------------------------------------------
  // 3. AMBIENT FALLING LEAVES
  // ----------------------------------------------------
  function createFallingLeaves() {
    const leafContainer = document.getElementById("leaf-container");
    if (!leafContainer) return;
    
    // Leaf path definitions for diversity
    const leafPaths = [
      "M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z",
      "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
    ];
    
    const colors = ["#d4a574", "#e8c9a0", "#846758", "#c9a87c", "#4a2816"];
    const leafCount = 20;
    
    for (let i = 0; i < leafCount; i++) {
      const leaf = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      leaf.setAttribute("viewBox", "0 0 24 24");
      leaf.classList.add("leaf");
      
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      // Choose leaf style path
      path.setAttribute("d", leafPaths[0]);
      leaf.appendChild(path);
      
      // Randomize position and animation properties
      const left = Math.random() * 100;
      const size = 12 + Math.random() * 12; // 12px to 24px
      const duration = 6 + Math.random() * 7; // 6s to 13s
      const delay = Math.random() * 5;
      const sway = -30 + Math.random() * 60; // -30px to 30px
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      leaf.style.left = `${left}%`;
      leaf.style.width = `${size}px`;
      leaf.style.height = `${size}px`;
      leaf.style.color = color;
      leaf.style.setProperty("--sway", `${sway}px`);
      leaf.style.animationName = "leaf-fall";
      leaf.style.animationDuration = `${duration}s`;
      leaf.style.animationDelay = `${delay}s`;
      leaf.style.animationTimingFunction = "ease-in-out";
      leaf.style.animationIterationCount = "infinite";
      
      leafContainer.appendChild(leaf);
    }
  }
  
  createFallingLeaves();

  // ----------------------------------------------------
  // 4. ENVELOPE OPENING LOGIC
  // ----------------------------------------------------
  function openEnvelope() {
    body.classList.remove("locked");
    envelopeOverlay.classList.add("hide");
    mainInvitation.classList.add("show");
    
    // Play romantic background instrumental
    playAudio();
    
    // Smooth scroll to hero
    setTimeout(() => {
      heroSection.classList.add("active");
      heroSection.scrollIntoView({ behavior: "smooth" });
    }, 400);
  }

  if (btnOpenEnvelope) btnOpenEnvelope.addEventListener("click", openEnvelope);
  if (btnOpenText) btnOpenText.addEventListener("click", openEnvelope);

  // ----------------------------------------------------
  // 5. AUDIO MUSIC CONTROLS
  // ----------------------------------------------------
  let isPlaying = false;
  
  function playAudio() {
    weddingAudio.play().then(() => {
      isPlaying = true;
      musicBtn.classList.add("playing");
    }).catch(error => {
      console.log("Autoplay was blocked by browser. User gesture required.", error);
      isPlaying = false;
      musicBtn.classList.remove("playing");
    });
  }
  
  function toggleAudio() {
    if (isPlaying) {
      weddingAudio.pause();
      isPlaying = false;
      musicBtn.classList.remove("playing");
      showToast("Đã tắt nhạc nền");
    } else {
      weddingAudio.play().then(() => {
        isPlaying = true;
        musicBtn.classList.add("playing");
        showToast("Đang phát nhạc nền");
      }).catch(err => console.log(err));
    }
  }

  if (musicBtn) musicBtn.addEventListener("click", toggleAudio);

  // ----------------------------------------------------
  // 6. SCROLL TO TOP & SCROLL INTERACTION
  // ----------------------------------------------------
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollTopBtn.style.opacity = "1";
      scrollTopBtn.style.pointerEvents = "auto";
    } else {
      scrollTopBtn.style.opacity = "0";
      scrollTopBtn.style.pointerEvents = "none";
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (heroScrollBtn) {
    heroScrollBtn.addEventListener("click", () => {
      document.querySelector(".welcome-section").scrollIntoView({ behavior: "smooth" });
    });
  }

  // ----------------------------------------------------
  // 7. REVEAL ELEMENTS ON SCROLL
  // ----------------------------------------------------
  const revealElements = document.querySelectorAll(".reveal");
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ----------------------------------------------------
  // 8. COUNTDOWN TIMER
  // ----------------------------------------------------
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    // DOM nodes
    const daysEl = document.getElementById("countdown-days");
    const hoursEl = document.getElementById("countdown-hours");
    const minsEl = document.getElementById("countdown-minutes");
    const secsEl = document.getElementById("countdown-seconds");
    
    if (distance < 0) {
      if (daysEl) daysEl.innerText = "00";
      if (hoursEl) hoursEl.innerText = "00";
      if (minsEl) minsEl.innerText = "00";
      if (secsEl) secsEl.innerText = "00";
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    if (daysEl) daysEl.innerText = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, "0");
    if (minsEl) minsEl.innerText = String(minutes).padStart(2, "0");
    if (secsEl) secsEl.innerText = String(seconds).padStart(2, "0");
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // ----------------------------------------------------
  // 9. ADD TO CALENDAR EVENT
  // ----------------------------------------------------
  const calendarButtons = document.querySelectorAll(".btn-add-calendar");
  
  calendarButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const type = e.currentTarget.getAttribute("data-event");
      let url = "";
      
      if (type === "ceremony") {
        const title = encodeURIComponent("Lễ Thành Hôn: Thành Lộc & Minh Thư");
        const details = encodeURIComponent("Lễ Thành Hôn được cử hành trang trọng tại Tư gia nhà trai.\n\nKính mời quý khách đến dự và chung vui!");
        const location = encodeURIComponent("60, ấp 7, xã Mỹ Lệ, tỉnh Tây Ninh");
        url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20270430T090000/20270430T110000&details=${details}&location=${location}&ctz=Asia/Ho_Chi_Minh`;
      } else {
        const title = encodeURIComponent("Tiệc Cưới: Thành Lộc & Minh Thư");
        const details = encodeURIComponent("Rất hân hạnh được đón tiếp quý khách đến chung vui cùng gia đình chúng tôi tại tiệc cưới ấm cúng.\n\nSự hiện diện của quý khách là niềm vinh hạnh lớn!");
        const location = encodeURIComponent("White Palace Convention Center, 194 Hoàng Văn Thụ, Phú Nhuận, TP. Hồ Chí Minh");
        url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20270430T173000/20270430T213000&details=${details}&location=${location}&ctz=Asia/Ho_Chi_Minh`;
      }
      
      window.open(url, "_blank");
      showToast("Mở Google Lịch thành công!");
    });
  });

  // ----------------------------------------------------
  // 10. GALLERY LIGHTBOX MODAL
  // ----------------------------------------------------
  const galleryItems = document.querySelectorAll(".gallery-item");
  
  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const index = parseInt(item.getAttribute("data-index"), 10);
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentLightboxIndex = index;
    lightboxImg.src = galleryImages[index];
    lightboxModal.classList.add("show");
    body.classList.add("locked");
  }

  function closeLightbox() {
    lightboxModal.classList.remove("show");
    if (!envelopeOverlay.classList.contains("hide")) {
      body.classList.add("locked");
    } else {
      body.classList.remove("locked");
    }
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  function showPrevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentLightboxIndex];
  }

  function showNextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentLightboxIndex];
  }

  if (lightboxPrev) lightboxPrev.addEventListener("click", (e) => {
    e.stopPropagation();
    showPrevImage();
  });
  if (lightboxNext) lightboxNext.addEventListener("click", (e) => {
    e.stopPropagation();
    showNextImage();
  });

  // Keypress navigation for lightbox
  document.addEventListener("keydown", (e) => {
    if (!lightboxModal.classList.contains("show")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrevImage();
    if (e.key === "ArrowRight") showNextImage();
  });

  // ----------------------------------------------------
  // 11. GIFT MODALS & COPY BUTTONS
  // ----------------------------------------------------
  function openGroomGift() {
    if (groomModal) {
      groomModal.classList.add("show");
      body.classList.add("locked");
    }
  }
  
  function closeModal(modal) {
    if (modal) {
      modal.classList.remove("show");
      body.classList.remove("locked");
    }
  }

  if (btnGroomGift) btnGroomGift.addEventListener("click", openGroomGift);
  
  if (groomModalClose) groomModalClose.addEventListener("click", () => closeModal(groomModal));
  
  if (groomModal) {
    groomModal.addEventListener("click", (e) => {
      if (e.target === groomModal) closeModal(groomModal);
    });
  }

  // Copy Account Number
  const copyButtons = document.querySelectorAll(".btn-copy-account");
  copyButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const targetId = e.currentTarget.getAttribute("data-target");
      const accountNum = document.getElementById(targetId).innerText;
      
      navigator.clipboard.writeText(accountNum).then(() => {
        const originalText = e.currentTarget.innerText;
        e.currentTarget.innerText = "Đã chép!";
        e.currentTarget.style.backgroundColor = "var(--color-gold)";
        
        showToast("Đã sao chép số tài khoản!");
        
        setTimeout(() => {
          e.currentTarget.innerText = originalText;
          e.currentTarget.style.backgroundColor = "";
        }, 2000);
      }).catch(err => {
        console.error("Failed to copy text: ", err);
      });
    });
  });

  // ----------------------------------------------------
  // 12. RSVP FORM HANDLER
  // ----------------------------------------------------
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("rsvp-name").value;
      const attendance = document.getElementById("rsvp-attendance").value;
      const guests = document.getElementById("rsvp-guests").value;
      const bus = document.querySelector('input[name="rsvp-bus"]:checked').value;
      const vegetarian = document.querySelector('input[name="rsvp-diet"]:checked').value;
      const note = document.getElementById("rsvp-note").value;
      
      const rsvpData = {
        name,
        attendance,
        guests,
        bus,
        vegetarian,
        note,
        timestamp: new Date().toISOString()
      };
      
      // Store in localStorage
      try {
        let rsvps = JSON.parse(localStorage.getItem("wedding_rsvps")) || [];
        rsvps.push(rsvpData);
        localStorage.setItem("wedding_rsvps", JSON.stringify(rsvps));
      } catch (err) {
        console.warn("Storage write failed for RSVP", err);
        inMemoryRsvps.push(rsvpData);
      }
      
      // Send to Google Sheet if configured
      if (GOOGLE_SHEET_URL) {
        const formData = new URLSearchParams();
        formData.append("type", "rsvp");
        for (const key in rsvpData) {
          formData.append(key, rsvpData[key]);
        }
        
        fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          mode: "cors",
          credentials: "omit",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: formData
        })
        .then(() => console.log("RSVP sent to Google Sheet successfully"))
        .catch(err => console.error("Error sending RSVP to Google Sheet:", err));
      }
      
      // Feedback Toast
      showToast("Cảm ơn bạn! Thông tin xác nhận đã được gửi thành công.");
      
      // Reset form
      rsvpForm.reset();
    });
  }

  // ----------------------------------------------------
  // 13. GUESTBOOK / WISHES SYSTEM
  // ----------------------------------------------------
  // Default fallback wishes to populate if empty
  const defaultWishes = [
    {
      author: "Gia đình chị Phương",
      message: "Chúc hai em trăm năm hạnh phúc, đầu bạc răng long nhé! Chúc đám cưới diễn ra thật trọn vẹn và nhiều niềm vui.",
      date: "01/06/2026"
    },
    {
      author: "Anh Tuấn Anh",
      message: "Chúc mừng hạnh phúc Lộc & Thư! Một cặp đôi trai tài gái sắc. Chúc hai bạn cuộc sống gia đình tràn ngập tiếng cười và hạnh phúc viên mãn.",
      date: "01/06/2026"
    }
  ];

  // Storage fallback containers
  let inMemoryWishes = null;
  let inMemoryRsvps = [];
  let wishesData = []; // Danh sách lời chúc hiển thị trên giao diện

  function getWishes() {
    try {
      let wishes = localStorage.getItem("wedding_wishes");
      if (!wishes) {
        localStorage.setItem("wedding_wishes", JSON.stringify(defaultWishes));
        return defaultWishes;
      }
      return JSON.parse(wishes);
    } catch (e) {
      console.warn("Storage access failed, using in-memory backup", e);
      if (!inMemoryWishes) inMemoryWishes = [...defaultWishes];
      return inMemoryWishes;
    }
  }

  function renderWishes() {
    const wishes = wishesData;
    
    if (!wishesList) return;
    
    if (wishes.length === 0) {
      wishesList.innerHTML = `<div class="guestbook-empty">Chưa có lời chúc nào. Hãy là người đầu tiên!</div>`;
      return;
    }
    
    // Tạo danh sách lời chúc hiển thị
    wishesList.innerHTML = wishes
      .map(w => `
        <div class="wish-item">
          <div class="wish-header">
            <span class="wish-author">${escapeHTML(w.author)}</span>
            <span class="wish-date">${formatDateString(w.date)}</span>
          </div>
          <p class="wish-content">${escapeHTML(w.message)}</p>
        </div>
      `)
      .join("");
  }

  // Tải danh sách lời chúc từ Google Sheet
  async function fetchWishes() {
    if (!GOOGLE_SHEET_URL) {
      wishesData = getWishes();
      renderWishes();
      return;
    }
    
    try {
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "GET",
        mode: "cors",
        credentials: "omit"
      });
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        // Lưu ý: data trả về từ doGet đã được sắp xếp mới nhất lên đầu trong Apps Script
        wishesData = data;
      } else {
        wishesData = getWishes();
      }
    } catch (err) {
      console.warn("Failed to fetch wishes from Google Sheet, using local storage fallback", err);
      wishesData = getWishes();
    }
    renderWishes();
  }

  if (wishForm) {
    wishForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const author = document.getElementById("wish-author").value.trim();
      const message = document.getElementById("wish-message").value.trim();
      
      if (!author || !message) return;
      
      const now = new Date();
      const dateStr = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
      
      const newWish = {
        author,
        message,
        date: dateStr,
        timestamp: now.toISOString()
      };
      
      // Lưu tạm thời vào local storage
      let localWishes = getWishes();
      localWishes.unshift(newWish);
      try {
        localStorage.setItem("wedding_wishes", JSON.stringify(localWishes));
      } catch (err) {
        console.warn("Storage write failed", err);
        inMemoryWishes = localWishes;
      }
      
      // Cập nhật giao diện lập tức (đưa lời chúc mới lên đầu danh sách)
      wishesData.unshift(newWish);
      renderWishes();
      showToast("Lời chúc của bạn đã được gửi!");
      
      // Gửi lời chúc lên Google Sheet
      if (GOOGLE_SHEET_URL) {
        const formData = new URLSearchParams();
        formData.append("type", "wish");
        formData.append("author", author);
        formData.append("message", message);
        formData.append("date", dateStr);
        formData.append("timestamp", newWish.timestamp);
        
        fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          mode: "cors",
          credentials: "omit",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: formData
        })
        .then(() => {
          console.log("Wish sent to Google Sheet successfully");
          // Tải lại lời chúc từ server sau 1.5 giây để đồng bộ hóa hoàn toàn
          setTimeout(fetchWishes, 1500);
        })
        .catch(err => console.error("Error sending wish to Google Sheet:", err));
      }
      
      wishForm.reset();
    });
  }

  function escapeHTML(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatDateString(dateVal) {
    if (!dateVal) return "";
    // Nếu đã ở định dạng dd/mm/yyyy thì giữ nguyên
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateVal)) {
      return dateVal;
    }
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) {
        return dateVal;
      }
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const hh = String(d.getHours()).padStart(2, "0");
      const min = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
    } catch (e) {
      return dateVal;
    }
  }

  // Tải danh sách lời chúc ban đầu
  fetchWishes();

  // ----------------------------------------------------
  // 14. TOAST NOTIFICATION UTILITY
  // ----------------------------------------------------
  function showToast(message) {
    if (!toastContainer) return;
    
    const toast = document.createElement("div");
    toast.className = "toast";
    
    toast.innerHTML = `
      <svg class="toast-success-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
      <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto dismiss
    setTimeout(() => {
      toast.classList.add("hide");
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3500);
  }

});
