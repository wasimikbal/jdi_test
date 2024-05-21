import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loadModels = async (modelPaths) => {
    const loader = new GLTFLoader();
    const models = [];

    for (const path of modelPaths) {
        try {
            const model = await loadModel(loader, path);
            models.push(model);
        } catch (error) {
            console.log(error);
        }
    }

    return models;
}

const loadModel = (loader, path) => {
    return new Promise((resolve, reject) => {
        loader.load(
            path,
            (gltf) => {
                resolve(gltf.scene);
            },
            undefined,
            (error) => {
                reject(error);
            }
        );
    });
}

export { loadModels };
