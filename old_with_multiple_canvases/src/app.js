import * as THREE from 'three'
import { loadModel } from './modelLoader'
import { items } from './getItems'
import { nextBtn, backBtn, scrollContainer } from './views'
import { setupPopup } from './setupPopup'


const showPopupBtn = document.getElementById('show');
const hidePopupBtn = document.getElementById('hide');
const popup = document.getElementById('popup');


const itemWidth = 300
const padding = 20

backBtn.addEventListener('click', () => {
    scrollContainer.style.scrollBehavior = "smooth"
    scrollContainer.scrollLeft -= itemWidth + padding
})

nextBtn.addEventListener('click', () => {
    scrollContainer.style.scrollBehavior = "smooth"
    scrollContainer.scrollLeft += itemWidth + padding
})

items.forEach((item) => {
    loadModel(item.conatinerID, item.path)
    setupPopup(item)
})

// const scene = null;
// const camera = null;
// const renderer = null;

// const animate = () => {
//     renderer.render(scene, camera);
// }

// animate