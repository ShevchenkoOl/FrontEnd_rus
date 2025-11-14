    const modal = document.getElementById('modal');
    const openModal = document.getElementById('openModal');
    const closeModal = document.getElementById('closeModal');

    openModal.onclick = () => modal.style.display = 'flex';
    closeModal.onclick = () => modal.style.display = 'none';
   



    const hamburger = document.getElementById('hamburger');
    const menu = document.querySelector('.list');

    hamburger.onclick = () => menu.classList.toggle('open');