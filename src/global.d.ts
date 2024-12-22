declare module 'three-stdlib/addons/csg/CSG.js' {
    export class CSG {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        static fromMesh(mesh: THREE.Mesh): any;
        toMesh(material?: THREE.Material): THREE.Mesh;
        subtract(csg: CSG): CSG;
        union(csg: CSG): CSG;
        intersect(csg: CSG): CSG;
    }
}