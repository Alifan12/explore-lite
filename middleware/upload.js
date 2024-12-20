import multer from "multer";
import path from "path";

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './storage/images'); // Folder tempat menyimpan gambar
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nama file unik
    }
});

// Filter file berdasarkan tipe (opsional)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."), false);
    }
};

export const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter 
});
