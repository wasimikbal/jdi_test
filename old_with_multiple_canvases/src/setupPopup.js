const popup = document.getElementById('popup');
const description = document.getElementById("popupDescription");
const closePopup = document.getElementById('closePopupBtn');

export const setupPopup = (item) => {
    const canvas = document.getElementById(item.conatinerID);    
    canvas.addEventListener('click', () => {
        if (popup.style.display == '' || popup.style.display == 'none') {
            description.textContent = item.info;
            popup.style.display = 'flex';
        }
        else {
            popup.style.display = 'none';
        }
    });

    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    
}