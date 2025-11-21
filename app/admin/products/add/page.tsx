// 'use client';

// import React, { useState, useRef } from 'react';
// import { FileText, Download, Plus, X } from 'lucide-react';

// interface Specification {
//   name: string;
//   value: string;
// }

// interface UploadedImage {
//   id: string;
//   file: File;
//   preview: string;
// }

// export default function AddProductPage() {
//   const [specifications, setSpecifications] = useState<Specification[]>([
//     { name: '', value: '' },
//   ]);
//   const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const addSpecification = () => {
//     setSpecifications([...specifications, { name: '', value: '' }]);
//   };

//   const removeSpecification = (index: number) => {
//     setSpecifications(specifications.filter((_, i) => i !== index));
//   };

//   const updateSpecification = (
//     index: number,
//     field: 'name' | 'value',
//     value: string
//   ) => {
//     const updated = [...specifications];
//     updated[index][field] = value;
//     setSpecifications(updated);
//   };

//   const handleFileSelect = (files: FileList | null) => {
//     if (!files) return;

//     const remainingSlots = 4 - uploadedImages.length;
//     const filesToAdd = Array.from(files).slice(0, remainingSlots);

//     filesToAdd.forEach((file) => {
//       if (file.type.startsWith('image/')) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           const newImage: UploadedImage = {
//             id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
//             file,
//             preview: reader.result as string,
//           };
//           setUploadedImages((prev) => [...prev, newImage]);
//         };
//         reader.readAsDataURL(file);
//       }
//     });
//   };

//   const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     handleFileSelect(e.target.files);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//     handleFileSelect(e.dataTransfer.files);
//   };

//   const removeImage = (id: string) => {
//     setUploadedImages((prev) => {
//       const updated = prev.filter((img) => img.id !== id);
//       // Clean up object URLs
//       const removed = prev.find((img) => img.id === id);
//       if (removed && removed.preview.startsWith('blob:')) {
//         URL.revokeObjectURL(removed.preview);
//       }
//       return updated;
//     });
//   };

//   const openFileDialog = () => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-gray-900">Add Product</h1>
//         <div className="flex items-center gap-3">
//           <button className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
//             <FileText className="w-4 h-4" />
//             <span>Drafts</span>
//           </button>
//           <button className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
//             <Download className="w-4 h-4" />
//             <span>Import Products</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Form */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-8">
//         {/* Product Media Section */}
//         <div>
//           <h2 className="text-xl font-bold text-gray-900 mb-4">Product Media</h2>
          
//           {/* Image Upload Area */}
//           {uploadedImages.length < 4 && (
//             <div
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               onDrop={handleDrop}
//               onClick={openFileDialog}
//               className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center transition-colors cursor-pointer ${
//                 isDragging
//                   ? 'border-blue-500 bg-blue-50'
//                   : 'border-gray-300 hover:border-blue-500'
//               }`}
//             >
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/jpeg,image/jpg,image/png"
//                 multiple
//                 onChange={handleFileInputChange}
//                 className="hidden"
//               />
//               <Plus className="w-16 h-16 text-gray-400 mb-4" />
//               <p className="text-gray-600 text-center text-sm">
//                 Please upload a maximum of 4 images to showcase this product.
//                 <br />
//                 Ensure images are 800x800 pixels and in JPEG or PNG format.
//               </p>
//             </div>
//           )}

//           {/* Uploaded Images Grid */}
//           {uploadedImages.length > 0 && (
//             <div className="mt-4">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {uploadedImages.map((image) => (
//                   <div
//                     key={image.id}
//                     className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
//                   >
//                     <img
//                       src={image.preview}
//                       alt="Product preview"
//                       className="w-full h-full object-cover"
//                     />
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         removeImage(image.id);
//                       }}
//                       className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//                 {uploadedImages.length < 4 && (
//                   <div
//                     onDragOver={handleDragOver}
//                     onDragLeave={handleDragLeave}
//                     onDrop={handleDrop}
//                     onClick={openFileDialog}
//                     className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors cursor-pointer aspect-square ${
//                       isDragging
//                         ? 'border-blue-500 bg-blue-50'
//                         : 'border-gray-300 hover:border-blue-500'
//                     }`}
//                   >
//                     <Plus className="w-8 h-8 text-gray-400" />
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Product Information Section */}
//         <div>
//           <h2 className="text-xl font-bold text-gray-900 mb-4">
//             Product Information
//           </h2>
//           <div className="space-y-6">
//             {/* Product Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Product Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter product name"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             {/* Category and Sub-category */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Category <span className="text-red-500">*</span>
//                 </label>
//                 <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//                   <option value="">Select a category</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Sub-category <span className="text-red-500">*</span>
//                 </label>
//                 <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//                   <option value="">Select a category</option>
//                 </select>
//               </div>
//             </div>

//             {/* Brand */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Brand <span className="text-red-500">*</span>
//               </label>
//               <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//                 <option value="">Select brand</option>
//               </select>
//             </div>

//             {/* MPN and Vendor Part Number */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Manufacturer part number (MPN){' '}
//                   <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter a manufacturer part number"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Vendor part number
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter a vendor part number"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* UPC and GSA Contract Number */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Universal product code (UPC)
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter a universal product code"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   GSA contract number
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     defaultValue="GS-07F-1234X"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
//                   />
//                   <select className="absolute right-2 top-1/2 transform -translate-y-1/2 border-none bg-transparent focus:outline-none">
//                     <option></option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* SKU/Custom Number */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 SKU/Custom number
//               </label>
//               <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//                 <option value="SKU_APP_0001">SKU_APP_0001</option>
//               </select>
//             </div>

//             {/* Short Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Short Description <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 rows={4}
//                 placeholder="Enter a short description"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Pricing & Margins Section */}
//         <div>
//           <h2 className="text-xl font-bold text-gray-900 mb-4">
//             Pricing & Margins
//           </h2>
//           <div className="space-y-6">
//             {/* Base Cost Price */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Base cost price <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="$XXX"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             {/* Sale Price */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Sale price % <span className="text-red-500">*</span>
//               </label>
//               <div className="flex gap-3">
//                 <input
//                   type="text"
//                   placeholder="XXX%"
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <div className="w-32 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg flex items-center justify-center">
//                   <span className="text-gray-600">$0.00</span>
//                 </div>
//               </div>
//             </div>

//             {/* Promotional Price */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Promotional price %
//               </label>
//               <div className="flex gap-3">
//                 <input
//                   type="text"
//                   placeholder="XXX%"
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <div className="w-32 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg flex items-center justify-center">
//                   <span className="text-gray-600">$0.00</span>
//                 </div>
//               </div>
//             </div>

//             {/* Government Price */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Government price %
//               </label>
//               <div className="flex gap-3">
//                 <input
//                   type="text"
//                   placeholder="XXX%"
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <div className="w-32 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg flex items-center justify-center">
//                   <span className="text-gray-600">$0.00</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Additional Information Section */}
//         <div>
//           <h2 className="text-xl font-bold text-gray-900 mb-4">
//             Additional Information
//           </h2>
//           <div className="space-y-6">
//             {/* Additional Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Additional Description
//               </label>
//               <textarea
//                 rows={6}
//                 placeholder="Enter a full description"
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>

//             {/* Specifications */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                 Specifications
//               </h3>
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="font-medium text-gray-700">Spec Name</div>
//                   <div className="font-medium text-gray-700">Spec Value</div>
//                 </div>
//                 {specifications.map((spec, index) => (
//                   <div key={index} className="grid grid-cols-2 gap-4">
//                     <input
//                       type="text"
//                       placeholder="Enter specification name"
//                       value={spec.name}
//                       onChange={(e) =>
//                         updateSpecification(index, 'name', e.target.value)
//                       }
//                       className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         placeholder="Enter specification value"
//                         value={spec.value}
//                         onChange={(e) =>
//                           updateSpecification(index, 'value', e.target.value)
//                         }
//                         className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                       {specifications.length > 1 && (
//                         <button
//                           onClick={() => removeSpecification(index)}
//                           className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                         >
//                           <X className="w-5 h-5" />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   onClick={addSpecification}
//                   className="text-blue-600 hover:text-blue-700 font-medium text-sm"
//                 >
//                   + Add new column
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
//           <button className="px-6 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
//             Save as Drafts
//           </button>
//           <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//             Preview Product
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// ytttttttttttttttttttttt


// 'use client';

// import React, { useState, useRef } from 'react';
// import { FileText, Download, Plus, X, ChevronLeft, Star, Heart, Minus, Check, Trash2 } from 'lucide-react';

// // Types
// interface Specification { 
//   name: string; 
//   value: string; 
// }

// interface UploadedImage {
//    id: string; 
//    preview: string; 
//   }

// interface Product {
//   id: string; name: string; category: string; subCategory: string; brand: string;
//   mpn: string; vendorPartNumber: string; upc: string; gsaContractNumber: string;
//   sku: string; shortDescription: string; baseCostPrice: string; salePrice: string;
//   promotionalPrice: string; governmentPrice: string; additionalDescription: string;
//   specifications: Specification[]; images: UploadedImage[]; createdAt: string; status: 'draft' | 'published';
// }

// const sampleDrafts: Product[] = [
//   { id: '1', name: 'SHARPIE Fine Point Markers Black', category: 'Office Products', subCategory: 'Binders & Accessories', brand: 'Sharpie', mpn: 'MTM-123456', vendorPartNumber: '#VND-123456', upc: '12345678901', gsaContractNumber: 'GS-07F-1234X', sku: 'SKU_APP_0001', shortDescription: 'Make Your Mark That Lasts. The Sharpie Fine Point Permanent Markers Deliver Bold, Smooth Ink.', baseCostPrice: '$25', salePrice: '40%', promotionalPrice: '100%', governmentPrice: '100%', additionalDescription: 'Premium markers for all surfaces.', specifications: [{ name: 'Weight', value: '75g' }], images: [], createdAt: 'Dec 24, 2025 | 09:45 AM', status: 'draft' },
//   { id: '2', name: 'SURARD NOTEBOOK Flexible Business', category: 'Office Products', subCategory: 'Notebooks', brand: 'Surard', mpn: 'SRD-789012', vendorPartNumber: '#VND-789012', upc: '98765432101', gsaContractNumber: 'GS-07F-5678X', sku: 'SKU_APP_0002', shortDescription: 'Professional notebook for business use.', baseCostPrice: '$15', salePrice: '30%', promotionalPrice: '0%', governmentPrice: '25%', additionalDescription: 'High-quality flexible notebook.', specifications: [{ name: 'Pages', value: '200' }], images: [], createdAt: 'Dec 24, 2025 | 09:45 AM', status: 'draft' },
//   { id: '3', name: 'Fellowes Wellness - Floor Mat Black', category: 'Office Products', subCategory: 'Furniture', brand: 'Fellowes', mpn: 'FLW-345678', vendorPartNumber: '#VND-345678', upc: '11223344556', gsaContractNumber: 'GS-07F-9012X', sku: 'SKU_APP_0003', shortDescription: 'Ergonomic floor mat for standing desks.', baseCostPrice: '$45', salePrice: '20%', promotionalPrice: '0%', governmentPrice: '15%', additionalDescription: 'Premium anti-fatigue floor mat.', specifications: [{ name: 'Size', value: '36x24 inches' }], images: [], createdAt: 'Dec 24, 2025 | 09:45 AM', status: 'draft' },
// ];

// // Modals
// const AddBrandModal = ({ onClose, onSave }: { onClose: () => void; onSave: (name: string) => void }) => {
//   const [name, setName] = useState('');
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-[#000000]">
//       <div className="bg-white rounded-lg p-6 w-96">
//         <h2 className="text-xl font-bold mb-4 text-[#000000]">Add New Brand</h2>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1 text-[#000000]">Brand Name *</label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter brand name" className="w-full px-4 py-2 border rounded-lg" />
//           <p className="text-xs  mt-1 text-[#000000]">Brand name must not exceed 250 characters</p>
//         </div>
//         <button onClick={() => name && onSave(name)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Save Brand</button>
//       </div>
//     </div>
//   );
// };

// const SuccessModal = ({ type, onClose }: { type: 'published' | 'draft'; onClose: () => void }) => (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg p-6 w-96 text-center">
//       <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//         <Check className="w-6 h-6 text-green-600" />
//       </div>
//       <h2 className="text-xl font-bold mb-2">{type === 'published' ? 'Product Uploaded Successful' : 'Product Saved To Drafts'}</h2>
//       <p className="text-gray-600 text-sm mb-4">{type === 'published' ? 'Your product has been added to the store and is now available for customers to view.' : 'Your product info has been saved as a draft. You can access and publish it anytime.'}</p>
//       <button onClick={onClose} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Close</button>
//     </div>
//   </div>
// );

// const DeleteModal = ({ title, message, confirmText = 'Delete', onCancel, onConfirm }: { title: string; message: string; confirmText?: string; onCancel: () => void; onConfirm: () => void }) => (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg p-6 w-96">
//       <h2 className="text-xl font-bold mb-2">{title}</h2>
//       <p className="text-gray-600 text-sm mb-6">{message}</p>
//       <div className="flex gap-3">
//         <button onClick={onCancel} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
//         <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">{confirmText}</button>
//       </div>
//     </div>
//   </div>
// );

// // Add Product Page
// const AddProductPage = ({ onPreview, onSaveDraft, onViewDrafts, onAddBrand, brands }: { onPreview: (p: Product) => void; onSaveDraft: (p: Product) => void; onViewDrafts: () => void; onAddBrand: () => void; brands: string[] }) => {
//   const [formData, setFormData] = useState({ name: '', category: '', subCategory: '', brand: '', mpn: '', vendorPartNumber: '', upc: '', gsaContractNumber: 'GS-07F-1234X', sku: 'SKU_APP_0001', shortDescription: '', baseCostPrice: '', salePrice: '', promotionalPrice: '', governmentPrice: '', additionalDescription: '' });
//   const [specs, setSpecs] = useState<Specification[]>([{ name: '', value: '' }]);
//   const [images, setImages] = useState<UploadedImage[]>([]);
//   const fileRef = useRef<HTMLInputElement>(null);

//   const handleFile = (files: FileList | null) => {
//     if (!files) return;
//     Array.from(files).slice(0, 4 - images.length).forEach(file => {
//       const reader = new FileReader();
//       reader.onloadend = () => setImages(prev => [...prev, { id: Date.now().toString(), preview: reader.result as string }]);
//       reader.readAsDataURL(file);
//     });
//   };

//   const createProduct = (): Product => ({ id: '', ...formData, specifications: specs, images, createdAt: new Date().toLocaleString(), status: 'draft' });

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-[#000000]">Add Product</h1>
//         <div className="flex gap-3">
//           <button onClick={onViewDrafts} className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 "><FileText className="w-4 h-4" />Drafts</button>
//           <button className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"><Download className="w-4 h-4 text-[#000000]" />Import</button>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg border p-6 space-y-6">
//         <div>
//           <h2 className="text-lg font-bold mb-3 text-[#000000]">Product Media</h2>
//           <input ref={fileRef} type="file" accept="image/*" multiple onChange={e => handleFile(e.target.files)} className="hidden" />
//           {images.length === 0 ? (
//             <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-500">
//               <Plus className="w-12 h-12 text-gray-400 mx-auto mb-2" />
//               <p className="text-sm text-[#000000]">Upload up to 4 images (800x800px, JPEG/PNG)</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-4 gap-3">
//               {images.map(img => (
//                 <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden border">
//                   <img src={img.preview} className="w-full h-full object-cover" />
//                   <button onClick={() => setImages(images.filter(i => i.id !== img.id))} className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100"><X className="w-4 h-4 mx-auto" /></button>
//                 </div>
//               ))}
//               {images.length < 4 && <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed rounded-lg flex items-center justify-center aspect-square cursor-pointer hover:border-blue-500"><Plus className="w-8 h-8 text-gray-400" /></div>}
//             </div>
//           )}
//         </div>

//         <div>
//           <h2 className="text-lg font-bold mb-3 text-[#000000]">Product Information</h2>
//           <div className="space-y-3">
//             <input type="text" placeholder="Product Name *" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
//             <div className="grid grid-cols-2 gap-3">
//               <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="px-4 py-2 border rounded-lg text-[#000000]">
//                 <option value="">Select Category *</option>
//                 <option value="Office Products">Office Products</option>
//               </select>
//               <select value={formData.subCategory} onChange={e => setFormData({ ...formData, subCategory: e.target.value })} className="px-4 py-2 border rounded-lg text-[#000000]">
//                 <option value="">Select Sub-category *</option>
//                 <option value="Binders & Accessories">Binders & Accessories</option>
//               </select>
//             </div>
//             <div className="flex gap-2">
//               <select value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} className="flex-1 px-4 py-2 border rounded-lg ">
//                 <option value="">Select Brand *</option>
//                 {brands.map(b => <option key={b} value={b}>{b}</option>)}
//               </select>
//               <button onClick={onAddBrand} className=" text-sm whitespace-nowrap text-[#000000]">+ Add New</button>
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               <input type="text" placeholder="MPN *" value={formData.mpn} onChange={e => setFormData({ ...formData, mpn: e.target.value })} className="px-4 py-2 border rounded-lg" />
//               <input type="text" placeholder="Vendor Part Number" value={formData.vendorPartNumber} onChange={e => setFormData({ ...formData, vendorPartNumber: e.target.value })} className="px-4 py-2 border rounded-lg" />
//             </div>
//             <textarea rows={2} placeholder="Short Description *" value={formData.shortDescription} onChange={e => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
//           </div>
//         </div>

//         <div>
//           <h2 className="text-lg font-bold mb-3">Pricing & Margins</h2>
//           <div className="space-y-3">
//             <input type="text" placeholder="Base Cost Price *" value={formData.baseCostPrice} onChange={e => setFormData({ ...formData, baseCostPrice: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
//             <div className="flex gap-3"><input type="text" placeholder="Sale Price %" value={formData.salePrice} onChange={e => setFormData({ ...formData, salePrice: e.target.value })} className="flex-1 px-4 py-2 border rounded-lg" /><div className="w-20 py-2 bg-gray-50 border rounded-lg text-center text-gray-500">$0.00</div></div>
//             <div className="flex gap-3"><input type="text" placeholder="Promotional %" value={formData.promotionalPrice} onChange={e => setFormData({ ...formData, promotionalPrice: e.target.value })} className="flex-1 px-4 py-2 border rounded-lg" /><div className="w-20 py-2 bg-gray-50 border rounded-lg text-center text-gray-500">$0.00</div></div>
//             <div className="flex gap-3"><input type="text" placeholder="Government %" value={formData.governmentPrice} onChange={e => setFormData({ ...formData, governmentPrice: e.target.value })} className="flex-1 px-4 py-2 border rounded-lg" /><div className="w-20 py-2 bg-gray-50 border rounded-lg text-center text-gray-500">$0.00</div></div>
//           </div>
//         </div>

//         <div>
//           <h2 className="text-lg font-bold mb-3">Additional Information</h2>
//           <textarea rows={3} placeholder="Additional Description" value={formData.additionalDescription} onChange={e => setFormData({ ...formData, additionalDescription: e.target.value })} className="w-full px-4 py-2 border rounded-lg mb-3" />
//           <p className="font-medium mb-2">Specifications</p>
//           {specs.map((s, i) => (
//             <div key={i} className="flex gap-2 mb-2">
//               <input type="text" placeholder="Spec Name" value={s.name} onChange={e => { const n = [...specs]; n[i].name = e.target.value; setSpecs(n); }} className="flex-1 px-3 py-2 border rounded-lg" />
//               <input type="text" placeholder="Spec Value" value={s.value} onChange={e => { const n = [...specs]; n[i].value = e.target.value; setSpecs(n); }} className="flex-1 px-3 py-2 border rounded-lg" />
//               {specs.length > 1 && <button onClick={() => setSpecs(specs.filter((_, j) => j !== i))} className="text-red-500"><X className="w-5 h-5" /></button>}
//             </div>
//           ))}
//           <button onClick={() => setSpecs([...specs, { name: '', value: '' }])} className="text-blue-600 text-sm">+ Add new column</button>
//         </div>

//         <div className="flex justify-end gap-3 pt-4 border-t">
//           <button onClick={() => onSaveDraft(createProduct())} className="px-6 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50">Save as Draft</button>
//           <button onClick={() => onPreview(createProduct())} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-[#000000]">Preview Product</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Preview Page
// const PreviewPage = ({ product, onBack, onPublish, onSaveDraft }: { product: Product; onBack: () => void; onPublish: () => void; onSaveDraft: () => void }) => {
//   const [qty, setQty] = useState(1);
//   const [tab, setTab] = useState('desc');
//   return (
//     <div className="p-6">
//       <button onClick={onBack} className="flex items-center gap-2 text-gray-600 mb-4"><ChevronLeft className="w-5 h-5" />Preview Product</button>
//       <div className="bg-white rounded-lg border p-6">
//         <div className="grid grid-cols-2 gap-6 mb-6">
//           <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
//             {product.images[0] ? <img src={product.images[0].preview} className="max-h-full" /> : <span className="text-gray-400">No Image</span>}
//           </div>
//           <div>
//             <div className="flex justify-between mb-2"><h1 className="text-xl font-bold">{product.name || 'Product Name'}</h1><Heart className="w-6 h-6 text-gray-300" /></div>
//             <div className="flex items-center gap-2 mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}<span className="text-sm text-gray-500">0 ratings</span></div>
//             <p className="text-2xl font-bold mb-3">$150</p>
//             <p className="text-gray-600 text-sm mb-4">{product.shortDescription || 'No description'}</p>
//             <div className="flex items-center gap-3">
//               <div className="flex items-center border rounded-lg">
//                 <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2"><Minus className="w-4 h-4" /></button>
//                 <span className="px-3">{qty}</span>
//                 <button onClick={() => setQty(qty + 1)} className="p-2"><Plus className="w-4 h-4" /></button>
//               </div>
//               <button className="flex-1 bg-blue-600 text-[#000000] py-2 rounded-lg">Add to cart</button>
//             </div>
//           </div>
//         </div>
//         <div className="border-b mb-4 flex gap-6">
//           {[['desc', 'Additional description'], ['specs', 'Specification'], ['reviews', 'Reviews (7)']].map(([k, l]) => (
//             <button key={k} onClick={() => setTab(k)} className={`pb-2 ${tab === k ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>{l}</button>
//           ))}
//         </div>
//         <div className="text-sm text-gray-600 mb-6">
//           {tab === 'desc' && <p>{product.additionalDescription || 'No additional description.'}</p>}
//           {tab === 'specs' && product.specifications.map((s, i) => <p key={i}><strong>{s.name}:</strong> {s.value}</p>)}
//           {tab === 'reviews' && <p>No reviews yet.</p>}
//         </div>
//         <div className="flex justify-end gap-3 pt-4 border-t">
//           <button onClick={onSaveDraft} className="px-6 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50">Save as Draft</button>
//           <button onClick={onPublish} className="px-6 py-2 bg-blue-600 text-[#000000] rounded-lg hover:bg-blue-700">Publish Product</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Drafts Page
// const DraftsPage = ({ drafts, onBack, onEdit, onDelete, onClearAll, onAddNew }: { drafts: Product[]; onBack: () => void; onEdit: (p: Product) => void; onDelete: (id: string) => void; onClearAll: () => void; onAddNew: () => void }) => (
//   <div className="p-6">
//     <div className="flex items-center justify-between mb-6">
//       <div className="flex items-center gap-2">
//         <button onClick={onBack}><ChevronLeft className="w-5 h-5" /></button>
//         <h1 className="text-2xl font-bold">Drafts <span className="text-gray-400">{drafts.length}</span></h1>
//       </div>
//       <div className="flex gap-3">
//         <button onClick={onClearAll} className="px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50">Clear all</button>
//         <button onClick={onAddNew} className="px-4 py-2 bg-blue-600 text-[#000000] rounded-lg hover:bg-blue-700">+ Add New Product</button>
//       </div>
//     </div>
//     <div className="space-y-4">
//       {drafts.map(d => (
//         <div key={d.id} className="bg-white rounded-lg border p-4 flex items-center gap-4">
//           <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
//             {d.images[0] ? <img src={d.images[0].preview} className="max-h-full" /> : <span className="text-xs text-[#000000]">No img</span>}
//           </div>
//           <div className="flex-1">
//             <p className="text-xs text-gray-500 mb-1">{d.createdAt}</p>
//             <h3 className="font-bold">{d.name}</h3>
//             <p className="text-sm text-gray-500">{d.category}</p>
//             <button onClick={() => onEdit(d)} className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded-lg">Edit Product</button>
//           </div>
//           <button onClick={() => onDelete(d.id)} className="text-red-500 hover:bg-red-50 p-2 rounded"><X className="w-5 h-5" /></button>
//         </div>
//       ))}
//       {drafts.length === 0 && <p className="text-center text-[#000000]py-8">No drafts saved.</p>}
//     </div>
//   </div>
// );

// // Main Component
// const ProductManagementSystem = () => {
//   const [view, setView] = useState<'add' | 'preview' | 'drafts'>('add');
//   const [drafts, setDrafts] = useState<Product[]>(sampleDrafts);
//   const [product, setProduct] = useState<Product | null>(null);
//   const [showBrandModal, setShowBrandModal] = useState(false);
//   const [showSuccess, setShowSuccess] = useState<'published' | 'draft' | null>(null);
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [showClearAll, setShowClearAll] = useState(false);
//   const [brands, setBrands] = useState(['Sharpie', 'Surard', 'Fellowes', '3M', 'HP']);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {view === 'add' && <AddProductPage onPreview={p => { setProduct(p); setView('preview'); }} onSaveDraft={p => { setDrafts([{ ...p, id: Date.now().toString() }, ...drafts]); setShowSuccess('draft'); }} onViewDrafts={() => setView('drafts')} onAddBrand={() => setShowBrandModal(true)} brands={brands} />}
//       {view === 'preview' && product && <PreviewPage product={product} onBack={() => setView('add')} onPublish={() => setShowSuccess('published')} onSaveDraft={() => setShowSuccess('draft')} />}
//       {view === 'drafts' && <DraftsPage drafts={drafts} onBack={() => setView('add')} onEdit={p => { setProduct(p); setView('preview'); }} onDelete={setDeleteId} onClearAll={() => setShowClearAll(true)} onAddNew={() => setView('add')} />}
      
//       {showBrandModal && <AddBrandModal onClose={() => setShowBrandModal(false)} onSave={n => { setBrands([...brands, n]); setShowBrandModal(false); }} />}
//       {showSuccess && <SuccessModal type={showSuccess} onClose={() => { setShowSuccess(null); if (showSuccess === 'published') setView('add'); }} />}
//       {deleteId && <DeleteModal title="Delete Draft?" message="Are you sure? This action cannot be undone." onCancel={() => setDeleteId(null)} onConfirm={() => { setDrafts(drafts.filter(d => d.id !== deleteId)); setDeleteId(null); }} />}
//       {showClearAll && <DeleteModal title="Clear All Drafts?" message="This will permanently delete all drafts." confirmText="Clear All" onCancel={() => setShowClearAll(false)} onConfirm={() => { setDrafts([]); setShowClearAll(false); }} />}
//     </div>
//   );
// };

// export default ProductManagementSystem;

// 780

// 'use client';

// import React, { useState, useRef } from 'react';
// import { FileText, Download, Plus, X, ChevronLeft, Star, Heart, Minus, Check } from 'lucide-react';

// interface Specification { name: string; value: string; }
// interface UploadedImage { id: string; preview: string; }
// interface Product {
//   id: string; name: string; category: string; subCategory: string; brand: string;
//   mpn: string; vendorPartNumber: string; upc: string; gsaContractNumber: string;
//   sku: string; shortDescription: string; baseCostPrice: string; salePrice: string;
//   promotionalPrice: string; governmentPrice: string; additionalDescription: string;
//   specifications: Specification[]; images: UploadedImage[]; createdAt: string; status: 'draft' | 'published';
// }

// const sampleDrafts: Product[] = [
//   { id: '1', name: 'SHARPIE Fine Point Markers Black', category: 'Office Products', subCategory: 'Binders', brand: 'Sharpie', mpn: 'MTM-123456', vendorPartNumber: '#VND-123456', upc: '123456789', gsaContractNumber: 'GS-07F-1234X', sku: 'SKU_APP_0001', shortDescription: 'Make Your Mark That Lasts.', baseCostPrice: '$25', salePrice: '40%', promotionalPrice: '100%', governmentPrice: '100%', additionalDescription: 'Premium markers.', specifications: [{ name: 'Weight', value: '75g' }], images: [], createdAt: 'Dec 24, 2025', status: 'draft' },
//   { id: '2', name: 'SURARD NOTEBOOK Flexible', category: 'Office Products', subCategory: 'Notebooks', brand: 'Surard', mpn: 'SRD-789', vendorPartNumber: '#VND-789', upc: '987654321', gsaContractNumber: 'GS-07F-5678X', sku: 'SKU_APP_0002', shortDescription: 'Professional notebook.', baseCostPrice: '$15', salePrice: '30%', promotionalPrice: '0%', governmentPrice: '25%', additionalDescription: 'Notebook.', specifications: [{ name: 'Pages', value: '200' }], images: [], createdAt: 'Dec 24, 2025', status: 'draft' },
// ];

// const AddBrandModal = ({ onClose, onSave }: { onClose: () => void; onSave: (n: string) => void }) => {
//   const [name, setName] = useState('');
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-96">
//         <h2 className="text-xl font-bold mb-4 text-gray-900">Add New Brand</h2>
//         <label className="block text-sm font-medium mb-1 text-gray-700">Brand Name *</label>
//         <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter brand name" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 mb-1" />
//         <p className="text-xs text-gray-500 mb-4">Brand name must not exceed 250 characters</p>
//         <button onClick={() => name && onSave(name)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Save Brand</button>
//       </div>
//     </div>
//   );
// };

// const SuccessModal = ({ type, onClose }: { type: 'published' | 'draft'; onClose: () => void }) => (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg p-6 w-96 text-center">
//       <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-6 h-6 text-green-600" /></div>
//       <h2 className="text-xl font-bold mb-2 text-gray-900">{type === 'published' ? 'Product Uploaded Successful' : 'Product Saved To Drafts'}</h2>
//       <p className="text-gray-600 text-sm mb-4">{type === 'published' ? 'Your product is now available.' : 'Saved as draft.'}</p>
//       <button onClick={onClose} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Close</button>
//     </div>
//   </div>
// );

// const DeleteModal = ({ title, message, confirmText = 'Delete', onCancel, onConfirm }: { title: string; message: string; confirmText?: string; onCancel: () => void; onConfirm: () => void }) => (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg p-6 w-96">
//       <h2 className="text-xl font-bold mb-2 text-gray-900">{title}</h2>
//       <p className="text-gray-600 text-sm mb-6">{message}</p>
//       <div className="flex gap-3">
//         <button onClick={onCancel} className="flex-1 px-4 py-2 border rounded-lg text-gray-700">Cancel</button>
//         <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">{confirmText}</button>
//       </div>
//     </div>
//   </div>
// );

// const AddProductPage = ({ onPreview, onSaveDraft, onViewDrafts, onAddBrand, brands }: { onPreview: (p: Product) => void; onSaveDraft: (p: Product) => void; onViewDrafts: () => void; onAddBrand: () => void; brands: string[] }) => {
//   const [form, setForm] = useState({ name: '', category: '', subCategory: '', brand: '', mpn: '', vendorPartNumber: '', upc: '', gsaContractNumber: 'GS-07F-1234X', sku: 'SKU_APP_0001', shortDescription: '', baseCostPrice: '', salePrice: '', promotionalPrice: '', governmentPrice: '', additionalDescription: '' });
//   const [specs, setSpecs] = useState<Specification[]>([{ name: '', value: '' }]);
//   const [images, setImages] = useState<UploadedImage[]>([]);
//   const fileRef = useRef<HTMLInputElement>(null);

//   const handleFile = (files: FileList | null) => {
//     if (!files) return;
//     Array.from(files).slice(0, 4 - images.length).forEach(file => {
//       const reader = new FileReader();
//       reader.onloadend = () => setImages(prev => [...prev, { id: Date.now().toString(), preview: reader.result as string }]);
//       reader.readAsDataURL(file);
//     });
//   };

//   const createProduct = (): Product => ({ id: '', ...form, specifications: specs, images, createdAt: new Date().toLocaleString(), status: 'draft' });
//   const inp = "w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400";
//   const sel = "w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white";
//   const lbl = "block text-sm font-medium mb-2 text-gray-700";

//   return (
//     <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
//         <div className="flex gap-3">
//           <button onClick={onViewDrafts} className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"><FileText className="w-4 h-4" />Drafts</button>
//           <button className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"><Download className="w-4 h-4" />Import Products</button>
//         </div>
//       </div>
//       <div className="bg-white rounded-lg border p-6 space-y-8">
//         <div>
//           <h2 className="text-lg font-bold mb-4 text-gray-900">Product Media</h2>
//           <input ref={fileRef} type="file" accept="image/*" multiple onChange={e => handleFile(e.target.files)} className="hidden" />
//           {images.length === 0 ? (
//             <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500">
//               <Plus className="w-16 h-16 text-gray-400 mx-auto mb-3" />
//               <p className="text-sm text-gray-500">Please upload a maximum of 4 images (800x800px, JPEG/PNG)</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-4 gap-4">
//               {images.map(img => (
//                 <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden border">
//                   <img src={img.preview} className="w-full h-full object-cover" />
//                   <button onClick={() => setImages(images.filter(i => i.id !== img.id))} className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center"><X className="w-4 h-4" /></button>
//                 </div>
//               ))}
//               {images.length < 4 && <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed rounded-lg flex items-center justify-center aspect-square cursor-pointer hover:border-blue-500"><Plus className="w-8 h-8 text-gray-400" /></div>}
//             </div>
//           )}
//         </div>
//         <div>
//           <h2 className="text-lg font-bold mb-4 text-gray-900">Product Information</h2>
//           <div className="space-y-4">
//             <div><label className={lbl}>Product Name <span className="text-red-500">*</span></label><input type="text" placeholder="Enter product name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inp} /></div>
//             <div className="grid grid-cols-2 gap-4">
//               <div><label className={lbl}>Category <span className="text-red-500">*</span></label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={sel}><option value="">Select a category</option><option value="Office Products">Office Products</option></select></div>
//               <div><div className="flex justify-between mb-2"><label className="text-sm font-medium text-gray-700">Sub-category <span className="text-red-500">*</span></label><button className="text-blue-600 text-sm">+ Add New</button></div><select value={form.subCategory} onChange={e => setForm({ ...form, subCategory: e.target.value })} className={sel}><option value="">Select a category</option><option value="Binders & Accessories">Binders & Accessories</option></select></div>
//             </div>
//             <div><div className="flex justify-between mb-2"><label className="text-sm font-medium text-gray-700">Brand <span className="text-red-500">*</span></label><button onClick={onAddBrand} className="text-blue-600 text-sm">+ Add New</button></div><select value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} className={sel}><option value="">Select a brand</option>{brands.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
//             <div className="grid grid-cols-2 gap-4">
//               <div><label className={lbl}>Manufacturer part number (MPN) <span className="text-red-500">*</span></label><input type="text" placeholder="Enter a manufacturer part number" value={form.mpn} onChange={e => setForm({ ...form, mpn: e.target.value })} className={inp} /></div>
//               <div><label className={lbl}>Vendor part number</label><input type="text" placeholder="Enter a vendor part number" value={form.vendorPartNumber} onChange={e => setForm({ ...form, vendorPartNumber: e.target.value })} className={inp} /></div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div><label className={lbl}>Universal product code (UPC)</label><input type="text" placeholder="Enter a universal product code" value={form.upc} onChange={e => setForm({ ...form, upc: e.target.value })} className={inp} /></div>
//               <div><label className={lbl}>GSA contract number</label><select value={form.gsaContractNumber} onChange={e => setForm({ ...form, gsaContractNumber: e.target.value })} className={sel}><option value="GS-07F-1234X">GS-07F-1234X</option></select></div>
//             </div>
//             <div><label className={lbl}>Short Description <span className="text-red-500">*</span></label><textarea rows={3} placeholder="Enter a short description" value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value })} className={inp} /></div>
//           </div>
//         </div>
//         <div>
//           <h2 className="text-lg font-bold mb-4 text-gray-900">Pricing & Margins</h2>
//           <div className="space-y-4">
//             <div><label className={lbl}>Base cost price <span className="text-red-500">*</span></label><input type="text" placeholder="$XXX" value={form.baseCostPrice} onChange={e => setForm({ ...form, baseCostPrice: e.target.value })} className={inp} /></div>
//             <div><label className={lbl}>Sale price % <span className="text-red-500">*</span></label><div className="flex gap-3"><input type="text" placeholder="XXX%" value={form.salePrice} onChange={e => setForm({ ...form, salePrice: e.target.value })} className={inp} /><div className="w-24 py-2 bg-gray-50 border rounded-lg text-center text-gray-600">$0.00</div></div></div>
//             <div><label className={lbl}>Promotional price %</label><div className="flex gap-3"><input type="text" placeholder="XXX%" value={form.promotionalPrice} onChange={e => setForm({ ...form, promotionalPrice: e.target.value })} className={inp} /><div className="w-24 py-2 bg-gray-50 border rounded-lg text-center text-gray-600">$0.00</div></div></div>
//             <div><label className={lbl}>Government price %</label><div className="flex gap-3"><input type="text" placeholder="XXX%" value={form.governmentPrice} onChange={e => setForm({ ...form, governmentPrice: e.target.value })} className={inp} /><div className="w-24 py-2 bg-gray-50 border rounded-lg text-center text-gray-600">$0.00</div></div></div>
//           </div>
//         </div>
//         <div>
//           <h2 className="text-lg font-bold mb-4 text-gray-900">Additional Information</h2>
//           <div><label className={lbl}>Additional Description</label><textarea rows={4} placeholder="Enter a full description" value={form.additionalDescription} onChange={e => setForm({ ...form, additionalDescription: e.target.value })} className={inp + " mb-4"} /></div>
//           <h3 className="text-base font-semibold mb-3 text-gray-900">Specifications</h3>
//           <div className="grid grid-cols-2 gap-4 mb-2"><span className="text-sm font-medium text-gray-700">Spec Name</span><span className="text-sm font-medium text-gray-700">Spec Value</span></div>
//           {specs.map((s, i) => (<div key={i} className="grid grid-cols-2 gap-4 mb-3"><input type="text" placeholder="Enter specification name" value={s.name} onChange={e => { const n = [...specs]; n[i].name = e.target.value; setSpecs(n); }} className={inp} /><div className="flex gap-2"><input type="text" placeholder="Enter specification value" value={s.value} onChange={e => { const n = [...specs]; n[i].value = e.target.value; setSpecs(n); }} className={inp} />{specs.length > 1 && <button onClick={() => setSpecs(specs.filter((_, j) => j !== i))} className="text-red-500 p-2"><X className="w-5 h-5" /></button>}</div></div>))}
//           <button onClick={() => setSpecs([...specs, { name: '', value: '' }])} className="text-blue-600 text-sm">+ Add new column</button>
//         </div>
//         <div className="flex justify-end gap-4 pt-6 border-t"><button onClick={() => onSaveDraft(createProduct())} className="px-6 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50">Save as Drafts</button><button onClick={() => onPreview(createProduct())} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Preview Product</button></div>
//       </div>
//     </div>
//   );
// };

// 'use client';

// import React, { useState, useRef } from 'react';
// import { FileText, Download, Plus, X, ChevronLeft, Star, Heart, Minus, Check } from 'lucide-react';

// interface Specification { name: string; value: string; }
// interface UploadedImage { id: string; preview: string; }
// interface Product {
//   id: string; name: string; category: string; subCategory: string; brand: string;
//   mpn: string; vendorPartNumber: string; upc: string; gsaContractNumber: string;
//   sku: string; shortDescription: string; baseCostPrice: string; salePrice: string;
//   promotionalPrice: string; governmentPrice: string; additionalDescription: string;
//   specifications: Specification[]; images: UploadedImage[]; createdAt: string; status: 'draft' | 'published';
// }

// const sampleDrafts: Product[] = [
//   { id: '1', name: 'SHARPIE Fine Point Markers Black', category: 'Office Products', subCategory: 'Binders', brand: 'Sharpie', mpn: 'MTM-123456', vendorPartNumber: '#VND-123456', upc: '123456789', gsaContractNumber: 'GS-07F-1234X', sku: 'SKU_APP_0001', shortDescription: 'Make Your Mark That Lasts.', baseCostPrice: '$25', salePrice: '40%', promotionalPrice: '100%', governmentPrice: '100%', additionalDescription: 'Premium markers.', specifications: [{ name: 'Weight', value: '75g' }], images: [], createdAt: 'Dec 24, 2025', status: 'draft' },
//   { id: '2', name: 'SURARD NOTEBOOK Flexible', category: 'Office Products', subCategory: 'Notebooks', brand: 'Surard', mpn: 'SRD-789', vendorPartNumber: '#VND-789', upc: '987654321', gsaContractNumber: 'GS-07F-5678X', sku: 'SKU_APP_0002', shortDescription: 'Professional notebook.', baseCostPrice: '$15', salePrice: '30%', promotionalPrice: '0%', governmentPrice: '25%', additionalDescription: 'Notebook.', specifications: [{ name: 'Pages', value: '200' }], images: [], createdAt: 'Dec 24, 2025', status: 'draft' },
// ];

// const AddBrandModal = ({ onClose, onSave }: { onClose: () => void; onSave: (n: string) => void }) => {
//   const [name, setName] = useState('');
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-96">
//         <h2 className="text-xl font-bold mb-4 text-gray-900">Add New Brand</h2>
//         <label className="block text-sm font-medium mb-1 text-gray-700">Brand Name *</label>
//         <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter brand name" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 mb-1" />
//         <p className="text-xs text-gray-500 mb-4">Brand name must not exceed 250 characters</p>
//         <button onClick={() => name && onSave(name)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Save Brand</button>
//       </div>
//     </div>
//   );
// };

// const SuccessModal = ({ type, onClose }: { type: 'published' | 'draft'; onClose: () => void }) => (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg p-6 w-96 text-center">
//       <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-6 h-6 text-green-600" /></div>
//       <h2 className="text-xl font-bold mb-2 text-gray-900">{type === 'published' ? 'Product Uploaded Successful' : 'Product Saved To Drafts'}</h2>
//       <p className="text-gray-600 text-sm mb-4">{type === 'published' ? 'Your product is now available.' : 'Saved as draft.'}</p>
//       <button onClick={onClose} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Close</button>
//     </div>
//   </div>
// );

// const DeleteModal = ({ title, message, confirmText = 'Delete', onCancel, onConfirm }: { title: string; message: string; confirmText?: string; onCancel: () => void; onConfirm: () => void }) => (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg p-6 w-96">
//       <h2 className="text-xl font-bold mb-2 text-gray-900">{title}</h2>
//       <p className="text-gray-600 text-sm mb-6">{message}</p>
//       <div className="flex gap-3">
//         <button onClick={onCancel} className="flex-1 px-4 py-2 border rounded-lg text-gray-700">Cancel</button>
//         <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">{confirmText}</button>
//       </div>
//     </div>
//   </div>
// );

// const AddProductPage = ({ onPreview, onSaveDraft, onViewDrafts, onAddBrand, brands }: { onPreview: (p: Product) => void; onSaveDraft: (p: Product) => void; onViewDrafts: () => void; onAddBrand: () => void; brands: string[] }) => {
//   const [form, setForm] = useState({ name: '', category: '', subCategory: '', brand: '', mpn: '', vendorPartNumber: '', upc: '', gsaContractNumber: 'GS-07F-1234X', sku: 'SKU_APP_0001', shortDescription: '', baseCostPrice: '', salePrice: '', promotionalPrice: '', governmentPrice: '', additionalDescription: '' });
//   const [specs, setSpecs] = useState<Specification[]>([{ name: '', value: '' }]);
//   const [images, setImages] = useState<UploadedImage[]>([]);
//   const fileRef = useRef<HTMLInputElement>(null);

//   const handleFile = (files: FileList | null) => {
//     if (!files) return;
//     Array.from(files).slice(0, 4 - images.length).forEach(file => {
//       const reader = new FileReader();
//       reader.onloadend = () => setImages(prev => [...prev, { id: Date.now().toString(), preview: reader.result as string }]);
//       reader.readAsDataURL(file);
//     });
//   };

//   const createProduct = (): Product => ({ id: '', ...form, specifications: specs, images, createdAt: new Date().toLocaleString(), status: 'draft' });
//   const inp = "w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400";
//   const sel = "w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white";
//   const lbl = "block text-sm font-medium mb-2 text-gray-700";

//   return (
//     <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
//         <div className="flex gap-3">
//           <button onClick={onViewDrafts} className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"><FileText className="w-4 h-4" />Drafts</button>
//           <button className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"><Download className="w-4 h-4" />Import Products</button>
//         </div>
//       </div>
//       <div className="bg-white rounded-lg border p-6 space-y-8">
//         <div>
//           <h2 className="text-lg font-bold mb-4 text-gray-900">Product Media</h2>
//           <input ref={fileRef} type="file" accept="image/*" multiple onChange={e => handleFile(e.target.files)} className="hidden" />
//           {images.length === 0 ? (
//             <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500">
//               <Plus className="w-16 h-16 text-gray-400 mx-auto mb-3" />
//               <p className="text-sm text-gray-500">Please upload a maximum of 4 images (800x800px, JPEG/PNG)</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-4 gap-4">
//               {images.map(img => (
//                 <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden border">
//                   <img src={img.preview} className="w-full h-full object-cover" />
//                   <button onClick={() => setImages(images.filter(i => i.id !== img.id))} className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center"><X className="w-4 h-4" /></button>
//                 </div>
//               ))}
//               {images.length < 4 && <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed rounded-lg flex items-center justify-center aspect-square cursor-pointer hover:border-blue-500"><Plus className="w-8 h-8 text-gray-400" /></div>}
//             </div>
//           )}
//         </div>
//         <div>
//           <h2 className="text-lg font-bold mb-4 text-gray-900">Product Information</h2>
//           <div className="space-y-4">
//             <div><label className={lbl}>Product Name <span className="text-red-500">*</span></label><input type="text" placeholder="Enter product name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inp} /></div>
//             <div className="grid grid-cols-2 gap-4">
//               <div><label className={lbl}>Category <span className="text-red-500">*</span></label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={sel}><option value="">Select a category</option><option value="Office Products">Office Products</option></select></div>
//               <div><div className="flex justify-between mb-2"><label className="text-sm font-medium text-gray-700">Sub-category <span className="text-red-500">*</span></label><button className="text-blue-600 text-sm">+ Add New</button></div><select value={form.subCategory} onChange={e => setForm({ ...form, subCategory: e.target.value })} className={sel}><option value="">Select a category</option><option value="Binders & Accessories">Binders & Accessories</option></select></div>
//             </div>
//             <div><div className="flex justify-between mb-2"><label className="text-sm font-medium text-gray-700">Brand <span className="text-red-500">*</span></label><button onClick={onAddBrand} className="text-blue-600 text-sm">+ Add New</button></div><select value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} className={sel}><option value="">Select a brand</option>{brands.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
//             <div className="grid grid-cols-2 gap-4">
//               <div><label className={lbl}>Manufacturer part number (MPN) <span className="text-red-500">*</span></label><input type="text" placeholder="Enter a manufacturer part number" value={form.mpn} onChange={e => setForm({ ...form, mpn: e.target.value })} className={inp} /></div>
//               <div><label className={lbl}>Vendor part number</label><input type="text" placeholder="Enter a vendor part number" value={form.vendorPartNumber} onChange={e => setForm({ ...form, vendorPartNumber: e.target.value })} className={inp} /></div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div><label className={lbl}>Universal product code (UPC)</label><input type="text" placeholder="Enter a universal product code" value={form.upc} onChange={e => setForm({ ...form, upc: e.target.value })} className={inp} /></div>
//               <div><label className={lbl}>GSA contract number</label><select value={form.gsaContractNumber} onChange={e => setForm({ ...form, gsaContractNumber: e.target.value })} className={sel}><option value="GS-07F-1234X">GS-07F-1234X</option></select></div>
//             </div>
//             <div><label className={lbl}>Short Description <span className="text-red-500">*</span></label><textarea rows={3} placeholder="Enter a short description" value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value })} className={inp} /></div>
//           </div>
//         </div>
//         <div>
//           <h2 className="text-lg font-bold mb-4 text-gray-900">Pricing & Margins</h2>
//           <div className="space-y-4">
//             <div><label className={lbl}>Base cost price <span className="text-red-500">*</span></label><input type="text" placeholder="$XXX" value={form.baseCostPrice} onChange={e => setForm({ ...form, baseCostPrice: e.target.value })} className={inp} /></div>
//             <div><label className={lbl}>Sale price % <span className="text-red-500">*</span></label><div className="flex gap-3"><input type="text" placeholder="XXX%" value={form.salePrice} onChange={e => setForm({ ...form, salePrice: e.target.value })} className={inp} /><div className="w-24 py-2 bg-gray-50 border rounded-lg text-center text-gray-600">$0.00</div></div></div>
//             <div><label className={lbl}>Promotional price %</label><div className="flex gap-3"><input type="text" placeholder="XXX%" value={form.promotionalPrice} onChange={e => setForm({ ...form, promotionalPrice: e.target.value })} className={inp} /><div className="w-24 py-2 bg-gray-50 border rounded-lg text-center text-gray-600">$0.00</div></div></div>
//             <div><label className={lbl}>Government price %</label><div className="flex gap-3"><input type="text" placeholder="XXX%" value={form.governmentPrice} onChange={e => setForm({ ...form, governmentPrice: e.target.value })} className={inp} /><div className="w-24 py-2 bg-gray-50 border rounded-lg text-center text-gray-600">$0.00</div></div></div>
//           </div>
//         </div>
//         <div>
//           <h2 className="text-lg font-bold mb-4 text-gray-900">Additional Information</h2>
//           <div><label className={lbl}>Additional Description</label><textarea rows={4} placeholder="Enter a full description" value={form.additionalDescription} onChange={e => setForm({ ...form, additionalDescription: e.target.value })} className={inp + " mb-4"} /></div>
//           <h3 className="text-base font-semibold mb-3 text-gray-900">Specifications</h3>
//           <div className="grid grid-cols-2 gap-4 mb-2"><span className="text-sm font-medium text-gray-700">Spec Name</span><span className="text-sm font-medium text-gray-700">Spec Value</span></div>
//           {specs.map((s, i) => (<div key={i} className="grid grid-cols-2 gap-4 mb-3"><input type="text" placeholder="Enter specification name" value={s.name} onChange={e => { const n = [...specs]; n[i].name = e.target.value; setSpecs(n); }} className={inp} /><div className="flex gap-2"><input type="text" placeholder="Enter specification value" value={s.value} onChange={e => { const n = [...specs]; n[i].value = e.target.value; setSpecs(n); }} className={inp} />{specs.length > 1 && <button onClick={() => setSpecs(specs.filter((_, j) => j !== i))} className="text-red-500 p-2"><X className="w-5 h-5" /></button>}</div></div>))}
//           <button onClick={() => setSpecs([...specs, { name: '', value: '' }])} className="text-blue-600 text-sm">+ Add new column</button>
//         </div>
//         <div className="flex justify-end gap-4 pt-6 border-t"><button onClick={() => onSaveDraft(createProduct())} className="px-6 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50">Save as Drafts</button><button onClick={() => onPreview(createProduct())} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Preview Product</button></div>
//       </div>
//     </div>
//   );
// };

// const PreviewPage = ({ product, onBack, onPublish, onSaveDraft }: { product: Product; onBack: () => void; onPublish: () => void; onSaveDraft: () => void }) => {
//   const [qty, setQty] = useState(1);
//   const [tab, setTab] = useState('desc');
//   const [selectedImg, setSelectedImg] = useState(0);
//   const displayImages = product.images.length > 0 ? product.images : [{ id: '0', preview: '' }];
//   const defaultDesc = "Make Your Mark That Lasts. The Sharpie Fine Point Permanent Markers Deliver Bold, Smooth Ink That Writes On Almost Any Surface.";
  
//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <button onClick={onBack} className="flex items-center gap-2 text-gray-700 mb-4 font-medium"><ChevronLeft className="w-5 h-5" />Preview Product</button>
      
//       <div className="bg-white rounded-lg border p-6 mb-6">
//         <div className="flex gap-8">
//           <div className="flex gap-4">
//             <div className="flex flex-col gap-2">
//               {displayImages.map((img, i) => (
//                 <div key={img.id} onClick={() => setSelectedImg(i)} className={`w-16 h-16 border-2 rounded-lg cursor-pointer overflow-hidden flex items-center justify-center bg-gray-50 ${selectedImg === i ? 'border-blue-500' : 'border-gray-200'}`}>
//                   {img.preview ? <img src={img.preview} className="w-full h-full object-cover" /> : <span className="text-xs text-gray-400">No img</span>}
//                 </div>
//               ))}
//             </div>
//             <div className="w-72 h-72 border rounded-lg flex items-center justify-center bg-gray-50">
//               {displayImages[selectedImg]?.preview ? <img src={displayImages[selectedImg].preview} className="max-w-full max-h-full object-contain" /> : <span className="text-gray-400">No Image</span>}
//             </div>
//           </div>
          
//           <div className="flex-1">
//             <div className="flex justify-between items-start mb-2">
//               <h1 className="text-xl font-bold text-gray-900">{product.name || 'Product Name'}</h1>
//               <Heart className="w-6 h-6 text-gray-300 cursor-pointer hover:text-red-400" />
//             </div>
//             <div className="flex items-center gap-3 mb-3">
//               <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-gray-300" />)}</div>
//               <span className="text-sm text-gray-500">0 rating(s)</span>
//               <span className="text-sm text-blue-600 cursor-pointer">Add a review</span>
//             </div>
//             <p className="text-2xl font-bold text-gray-900 mb-3">$150</p>
//             <div className="mb-4">
//               <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
//               <p className="text-gray-600 text-sm">{product.shortDescription || defaultDesc}</p>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="flex items-center border border-gray-300 rounded-lg">
//                 <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 text-gray-600 hover:bg-gray-50">-</button>
//                 <span className="px-4 py-2 text-gray-900 font-medium">{qty}</span>
//                 <button onClick={() => setQty(qty + 1)} className="px-4 py-2 text-gray-600 hover:bg-gray-50">+</button>
//               </div>
//               <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium">Add to cart</button>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white rounded-lg border p-6">
//         <div className="border-b border-gray-200 mb-6 flex gap-10">
//           <button onClick={() => setTab('desc')} className={`pb-3 font-medium ${tab === 'desc' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Additional description</button>
//           <button onClick={() => setTab('specs')} className={`pb-3 font-medium ${tab === 'specs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Specification</button>
//           <button onClick={() => setTab('reviews')} className={`pb-3 font-medium ${tab === 'reviews' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Reviews (17)</button>
//         </div>
        
//         <div className="text-sm text-gray-700 mb-6 min-h-32">
//           {tab === 'desc' && (
//             <div>
//               <p className="mb-4">{product.additionalDescription || defaultDesc}</p>
//               <ul className="list-disc list-inside space-y-1 text-gray-600">
//                 <li>Fine Point For Precise, Detailed Writing</li>
//                 <li>Quick-Drying Ink Resists Smudging And Fading</li>
//                 <li>Writes On Paper, Plastic, Metal, And Glass</li>
//                 <li>Permanent, Waterproof Ink</li>
//                 <li>Pack Includes Black, Blue, Red, And Green</li>
//               </ul>
//             </div>
//           )}
//           {tab === 'specs' && (
//             <div className="space-y-2">
//               {product.specifications.length > 0 ? product.specifications.map((s, i) => (
//                 <p key={i}><strong className="text-gray-900">{s.name}:</strong> {s.value}</p>
//               )) : <p>No specifications available.</p>}
//             </div>
//           )}
//           {tab === 'reviews' && <p className="text-gray-500">No reviews yet.</p>}
//         </div>
        
//         <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
//           <button onClick={onSaveDraft} className="px-8 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">Save as Draft</button>
//           <button onClick={onPublish} className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Publish Product</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DraftsPage = ({ drafts, onBack, onEdit, onDelete, onClearAll, onAddNew }: { drafts: Product[]; onBack: () => void; onEdit: (p: Product) => void; onDelete: (id: string) => void; onClearAll: () => void; onAddNew: () => void }) => (
//   <div className="p-6 bg-gray-50 min-h-screen">
//     <div className="flex items-center justify-between mb-6">
//       <div className="flex items-center gap-3"><button onClick={onBack}><ChevronLeft className="w-5 h-5 text-gray-600" /></button><h1 className="text-2xl font-bold text-gray-900">Drafts <span className="text-gray-400">{drafts.length}</span></h1></div>
//       <div className="flex gap-3"><button onClick={onClearAll} className="px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50">Clear all</button><button onClick={onAddNew} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">+ Add New Product</button></div>
//     </div>
//     <div className="space-y-4">
//       {drafts.map(d => (<div key={d.id} className="bg-white rounded-lg border p-4 flex items-center gap-4"><div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">{d.images[0] ? <img src={d.images[0].preview} className="max-h-full" /> : <span className="text-xs text-gray-400">No image</span>}</div><div className="flex-1"><p className="text-xs text-gray-500 mb-1">{d.createdAt}</p><h3 className="font-bold text-gray-900">{d.name}</h3><p className="text-sm text-gray-500">{d.category}</p><button onClick={() => onEdit(d)} className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded-lg">Edit Product</button></div><button onClick={() => onDelete(d.id)} className="text-red-500 p-2"><X className="w-5 h-5" /></button></div>))}
//       {drafts.length === 0 && <p className="text-center text-gray-500 py-12">No drafts saved.</p>}
//     </div>
//   </div>
// );

// export default function Page() {
//   const [view, setView] = useState<'add' | 'preview' | 'drafts'>('add');
//   const [drafts, setDrafts] = useState<Product[]>(sampleDrafts);
//   const [product, setProduct] = useState<Product | null>(null);
//   const [showBrandModal, setShowBrandModal] = useState(false);
//   const [showSuccess, setShowSuccess] = useState<'published' | 'draft' | null>(null);
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [showClearAll, setShowClearAll] = useState(false);
//   const [brands, setBrands] = useState(['Sharpie', 'Surard', 'Fellowes', '3M', 'HP']);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {view === 'add' && <AddProductPage onPreview={p => { setProduct(p); setView('preview'); }} onSaveDraft={p => { setDrafts([{ ...p, id: Date.now().toString() }, ...drafts]); setShowSuccess('draft'); }} onViewDrafts={() => setView('drafts')} onAddBrand={() => setShowBrandModal(true)} brands={brands} />}
//       {view === 'preview' && product && <PreviewPage product={product} onBack={() => setView('add')} onPublish={() => setShowSuccess('published')} onSaveDraft={() => setShowSuccess('draft')} />}
//       {view === 'drafts' && <DraftsPage drafts={drafts} onBack={() => setView('add')} onEdit={p => { setProduct(p); setView('preview'); }} onDelete={setDeleteId} onClearAll={() => setShowClearAll(true)} onAddNew={() => setView('add')} />}
//       {showBrandModal && <AddBrandModal onClose={() => setShowBrandModal(false)} onSave={n => { setBrands([...brands, n]); setShowBrandModal(false); }} />}
//       {showSuccess && <SuccessModal type={showSuccess} onClose={() => { setShowSuccess(null); if (showSuccess === 'published') setView('add'); }} />}
//       {deleteId && <DeleteModal title="Delete Draft?" message="Are you sure? This cannot be undone." onCancel={() => setDeleteId(null)} onConfirm={() => { setDrafts(drafts.filter(d => d.id !== deleteId)); setDeleteId(null); }} />}
//       {showClearAll && <DeleteModal title="Clear All Drafts?" message="This will permanently delete all drafts." confirmText="Clear All" onCancel={() => setShowClearAll(false)} onConfirm={() => { setDrafts([]); setShowClearAll(false); }} />}
//     </div>
//   );
// }



// const DraftsPage = ({ drafts, onBack, onEdit, onDelete, onClearAll, onAddNew }: { drafts: Product[]; onBack: () => void; onEdit: (p: Product) => void; onDelete: (id: string) => void; onClearAll: () => void; onAddNew: () => void }) => (
//   <div className="p-6 bg-gray-50 min-h-screen">
//     <div className="flex items-center justify-between mb-6">
//       <div className="flex items-center gap-3"><button onClick={onBack}><ChevronLeft className="w-5 h-5 text-gray-600" /></button><h1 className="text-2xl font-bold text-gray-900">Drafts <span className="text-gray-400">{drafts.length}</span></h1></div>
//       <div className="flex gap-3"><button onClick={onClearAll} className="px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50">Clear all</button><button onClick={onAddNew} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">+ Add New Product</button></div>
//     </div>
//     <div className="space-y-4">
//       {drafts.map(d => (<div key={d.id} className="bg-white rounded-lg border p-4 flex items-center gap-4"><div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">{d.images[0] ? <img src={d.images[0].preview} className="max-h-full" /> : <span className="text-xs text-gray-400">No image</span>}</div><div className="flex-1"><p className="text-xs text-gray-500 mb-1">{d.createdAt}</p><h3 className="font-bold text-gray-900">{d.name}</h3><p className="text-sm text-gray-500">{d.category}</p><button onClick={() => onEdit(d)} className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded-lg">Edit Product</button></div><button onClick={() => onDelete(d.id)} className="text-red-500 p-2"><X className="w-5 h-5" /></button></div>))}
//       {drafts.length === 0 && <p className="text-center text-gray-500 py-12">No drafts saved.</p>}
//     </div>
//   </div>
// );

// export default function Page() {
//   const [view, setView] = useState<'add' | 'preview' | 'drafts'>('add');
//   const [drafts, setDrafts] = useState<Product[]>(sampleDrafts);
//   const [product, setProduct] = useState<Product | null>(null);
//   const [showBrandModal, setShowBrandModal] = useState(false);
//   const [showSuccess, setShowSuccess] = useState<'published' | 'draft' | null>(null);
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [showClearAll, setShowClearAll] = useState(false);
//   const [brands, setBrands] = useState(['Sharpie', 'Surard', 'Fellowes', '3M', 'HP']);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {view === 'add' && <AddProductPage onPreview={p => { setProduct(p); setView('preview'); }} onSaveDraft={p => { setDrafts([{ ...p, id: Date.now().toString() }, ...drafts]); setShowSuccess('draft'); }} onViewDrafts={() => setView('drafts')} onAddBrand={() => setShowBrandModal(true)} brands={brands} />}
//       {view === 'preview' && product && <PreviewPage product={product} onBack={() => setView('add')} onPublish={() => setShowSuccess('published')} onSaveDraft={() => setShowSuccess('draft')} />}
//       {view === 'drafts' && <DraftsPage drafts={drafts} onBack={() => setView('add')} onEdit={p => { setProduct(p); setView('preview'); }} onDelete={setDeleteId} onClearAll={() => setShowClearAll(true)} onAddNew={() => setView('add')} />}
//       {showBrandModal && <AddBrandModal onClose={() => setShowBrandModal(false)} onSave={n => { setBrands([...brands, n]); setShowBrandModal(false); }} />}
//       {showSuccess && <SuccessModal type={showSuccess} onClose={() => { setShowSuccess(null); if (showSuccess === 'published') setView('add'); }} />}
//       {deleteId && <DeleteModal title="Delete Draft?" message="Are you sure? This cannot be undone." onCancel={() => setDeleteId(null)} onConfirm={() => { setDrafts(drafts.filter(d => d.id !== deleteId)); setDeleteId(null); }} />}
//       {showClearAll && <DeleteModal title="Clear All Drafts?" message="This will permanently delete all drafts." confirmText="Clear All" onCancel={() => setShowClearAll(false)} onConfirm={() => { setDrafts([]); setShowClearAll(false); }} />}
//     </div>
//   );
// }


'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { FileText, Download, Plus, X, ChevronLeft, Star, Heart, Minus, Check } from 'lucide-react';

interface Specification { name: string; value: string; }
interface UploadedImage { id: string; preview: string; }
interface Product {
  id: string; name: string; category: string; subCategory: string; brand: string;
  mpn: string; vendorPartNumber: string; upc: string; gsaContractNumber: string;
  sku: string; shortDescription: string; baseCostPrice: string; salePrice: string;
  promotionalPrice: string; governmentPrice: string; additionalDescription: string;
  specifications: Specification[]; images: UploadedImage[]; createdAt: string; status: 'draft' | 'published';
}

const sampleDrafts: Product[] = [
  { id: '1', name: 'SHARPIE Fine Point Markers Black', category: 'Office Products', subCategory: 'Binders', brand: 'Sharpie', mpn: 'MTM-123456', vendorPartNumber: '#VND-123456', upc: '123456789', gsaContractNumber: 'GS-07F-1234X', sku: 'SKU_APP_0001', shortDescription: 'Premium markers for all surfaces.', baseCostPrice: '$25', salePrice: '40%', promotionalPrice: '100%', governmentPrice: '100%', additionalDescription: 'Premium markers.', specifications: [{ name: 'Weight', value: '75g' }], images: [], createdAt: 'Dec 24, 2025', status: 'draft' },
  { id: '2', name: 'SURARD NOTEBOOK Flexible', category: 'Office Products', subCategory: 'Notebooks', brand: 'Surard', mpn: 'SRD-789', vendorPartNumber: '#VND-789', upc: '987654321', gsaContractNumber: 'GS-07F-5678X', sku: 'SKU_APP_0002', shortDescription: 'Professional notebook.', baseCostPrice: '$15', salePrice: '30%', promotionalPrice: '0%', governmentPrice: '25%', additionalDescription: 'Notebook.', specifications: [{ name: 'Pages', value: '200' }], images: [], createdAt: 'Dec 24, 2025', status: 'draft' },
];

function AddBrandModal({ onClose, onSave }: { onClose: () => void; onSave: (n: string) => void }) {
  const [name, setName] = useState('');
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Add New Brand</h2>
        <label className="block text-sm font-medium mb-1 text-gray-700">Brand Name *</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter brand name" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 mb-1" />
        <p className="text-xs text-gray-500 mb-4">Brand name must not exceed 250 characters</p>
        <button onClick={() => name && onSave(name)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Save Brand</button>
      </div>
    </div>
  );
}

function SuccessModal({ type, onClose }: { type: 'published' | 'draft'; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-6 h-6 text-green-600" /></div>
        <h2 className="text-xl font-bold mb-2 text-gray-900">{type === 'published' ? 'Product Uploaded Successful' : 'Product Saved To Drafts'}</h2>
        <p className="text-gray-600 text-sm mb-4">{type === 'published' ? 'Your product is now available.' : 'Saved as draft.'}</p>
        <button onClick={onClose} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Close</button>
      </div>
    </div>
  );
}

function DeleteModal({ title, message, confirmText = 'Delete', onCancel, onConfirm }: { title: string; message: string; confirmText?: string; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-2 text-gray-900">{title}</h2>
        <p className="text-gray-600 text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2 border rounded-lg text-gray-700">Cancel</button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">{confirmText}</button>
        </div>
      </div>
    </div>
  );
}

function AddProductPage({ onPreview, onSaveDraft, onViewDrafts, onAddBrand, brands }: { onPreview: (p: Product) => void; onSaveDraft: (p: Product) => void; onViewDrafts: () => void; onAddBrand: () => void; brands: string[] }) {
  const [form, setForm] = useState({ name: '', category: '', subCategory: '', brand: '', mpn: '', vendorPartNumber: '', upc: '', gsaContractNumber: 'GS-07F-1234X', sku: 'SKU_APP_0001', shortDescription: '', baseCostPrice: '', salePrice: '', promotionalPrice: '', governmentPrice: '', additionalDescription: '' });
  const [specs, setSpecs] = useState<Specification[]>([{ name: '', value: '' }]);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).slice(0, 4 - images.length).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setImages(prev => [...prev, { id: Date.now().toString(), preview: reader.result as string }]);
      reader.readAsDataURL(file);
    });
  };

  const createProduct = (): Product => ({ id: '', ...form, specifications: specs, images, createdAt: new Date().toLocaleString(), status: 'draft' });
  const inp = "w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400";
  const sel = "w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white";
  const lbl = "block text-sm font-medium mb-2 text-gray-700";

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
        <div className="flex gap-3">
          <button onClick={onViewDrafts} className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"><FileText className="w-4 h-4" />Drafts</button>
          <button className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"><Download className="w-4 h-4" />Import Products</button>
        </div>
      </div>
      <div className="bg-white rounded-lg border p-6 space-y-8">
        <div>
          <h2 className="text-lg font-bold mb-4 text-gray-900">Product Media</h2>
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={e => handleFile(e.target.files)} className="hidden" />
          {images.length === 0 ? (
            <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500">
              <Plus className="w-16 h-16 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-500">Please upload a maximum of 4 images (800x800px, JPEG/PNG)</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {images.map(img => (
                <div key={img.id} className="relative group aspect-square rounded-lg overflow-hidden border">
                  <img src={img.preview} className="w-full h-full object-cover" alt="" />
                  <button onClick={() => setImages(images.filter(i => i.id !== img.id))} className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center"><X className="w-4 h-4" /></button>
                </div>
              ))}
              {images.length < 4 && <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed rounded-lg flex items-center justify-center aspect-square cursor-pointer hover:border-blue-500"><Plus className="w-8 h-8 text-gray-400" /></div>}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4 text-gray-900">Product Information</h2>
          <div className="space-y-4">
            <div><label className={lbl}>Product Name <span className="text-red-500">*</span></label><input type="text" placeholder="Enter product name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inp} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={lbl}>Category <span className="text-red-500">*</span></label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={sel}><option value="">Select a category</option><option value="Office Products">Office Products</option></select></div>
              <div><div className="flex justify-between mb-2"><label className="text-sm font-medium text-gray-700">Sub-category <span className="text-red-500">*</span></label><button className="text-blue-600 text-sm">+ Add New</button></div><select value={form.subCategory} onChange={e => setForm({ ...form, subCategory: e.target.value })} className={sel}><option value="">Select a category</option><option value="Binders & Accessories">Binders & Accessories</option></select></div>
            </div>
            <div><div className="flex justify-between mb-2"><label className="text-sm font-medium text-gray-700">Brand <span className="text-red-500">*</span></label><button onClick={onAddBrand} className="text-blue-600 text-sm">+ Add New</button></div><select value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} className={sel}><option value="">Select a brand</option>{brands.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={lbl}>Manufacturer part number (MPN) <span className="text-red-500">*</span></label><input type="text" placeholder="Enter a manufacturer part number" value={form.mpn} onChange={e => setForm({ ...form, mpn: e.target.value })} className={inp} /></div>
              <div><label className={lbl}>Vendor part number</label><input type="text" placeholder="Enter a vendor part number" value={form.vendorPartNumber} onChange={e => setForm({ ...form, vendorPartNumber: e.target.value })} className={inp} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={lbl}>Universal product code (UPC)</label><input type="text" placeholder="Enter a universal product code" value={form.upc} onChange={e => setForm({ ...form, upc: e.target.value })} className={inp} /></div>
              <div><label className={lbl}>GSA contract number</label><select value={form.gsaContractNumber} onChange={e => setForm({ ...form, gsaContractNumber: e.target.value })} className={sel}><option value="GS-07F-1234X">GS-07F-1234X</option></select></div>
            </div>
            <div><label className={lbl}>Short Description <span className="text-red-500">*</span></label><textarea rows={3} placeholder="Enter a short description" value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value })} className={inp} /></div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4 text-gray-900">Pricing and Margins</h2>
          <div className="space-y-4">
            <div><label className={lbl}>Base cost price <span className="text-red-500">*</span></label><input type="text" placeholder="$XXX" value={form.baseCostPrice} onChange={e => setForm({ ...form, baseCostPrice: e.target.value })} className={inp} /></div>
            <div><label className={lbl}>Sale price % <span className="text-red-500">*</span></label><div className="flex gap-3"><input type="text" placeholder="XXX%" value={form.salePrice} onChange={e => setForm({ ...form, salePrice: e.target.value })} className={inp} /><div className="w-24 py-2 bg-gray-50 border rounded-lg text-center text-gray-600">$0.00</div></div></div>
            <div><label className={lbl}>Promotional price %</label><div className="flex gap-3"><input type="text" placeholder="XXX%" value={form.promotionalPrice} onChange={e => setForm({ ...form, promotionalPrice: e.target.value })} className={inp} /><div className="w-24 py-2 bg-gray-50 border rounded-lg text-center text-gray-600">$0.00</div></div></div>
            <div><label className={lbl}>Government price %</label><div className="flex gap-3"><input type="text" placeholder="XXX%" value={form.governmentPrice} onChange={e => setForm({ ...form, governmentPrice: e.target.value })} className={inp} /><div className="w-24 py-2 bg-gray-50 border rounded-lg text-center text-gray-600">$0.00</div></div></div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4 text-gray-900">Additional Information</h2>
          <div><label className={lbl}>Additional Description</label><textarea rows={4} placeholder="Enter a full description" value={form.additionalDescription} onChange={e => setForm({ ...form, additionalDescription: e.target.value })} className={inp + " mb-4"} /></div>
          <h3 className="text-base font-semibold mb-3 text-gray-900">Specifications</h3>
          <div className="grid grid-cols-2 gap-4 mb-2"><span className="text-sm font-medium text-gray-700">Spec Name</span><span className="text-sm font-medium text-gray-700">Spec Value</span></div>
          {specs.map((s, i) => (<div key={i} className="grid grid-cols-2 gap-4 mb-3"><input type="text" placeholder="Enter specification name" value={s.name} onChange={e => { const n = [...specs]; n[i].name = e.target.value; setSpecs(n); }} className={inp} /><div className="flex gap-2"><input type="text" placeholder="Enter specification value" value={s.value} onChange={e => { const n = [...specs]; n[i].value = e.target.value; setSpecs(n); }} className={inp} />{specs.length > 1 && <button onClick={() => setSpecs(specs.filter((_, j) => j !== i))} className="text-red-500 p-2"><X className="w-5 h-5" /></button>}</div></div>))}
          <button onClick={() => setSpecs([...specs, { name: '', value: '' }])} className="text-blue-600 text-sm">+ Add new column</button>
        </div>
        <div className="flex justify-end gap-4 pt-6 border-t">
          {/* <button onClick={() => onSaveDraft(createProduct())} className="px-6 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50">Save as Drafts</button> */}
          <Link href="/admin/products/drafts" className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50">
  <FileText className="w-4 h-4" />Drafts
</Link>
          <button onClick={() => onPreview(createProduct())} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Preview Product</button></div>
      </div>
    </div>
  );
}

function PreviewPage({ product, onBack, onPublish, onSaveDraft }: { product: Product; onBack: () => void; onPublish: () => void; onSaveDraft: () => void }) {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('desc');
  const [selectedImg, setSelectedImg] = useState(0);
  const displayImages = product.images.length > 0 ? product.images : [{ id: '0', preview: '' }];
  const defaultDesc = "Make Your Mark That Lasts. The Sharpie Fine Point Permanent Markers Deliver Bold, Smooth Ink That Writes On Almost Any Surface.";
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-700 mb-4 font-medium"><ChevronLeft className="w-5 h-5" />Preview Product</button>
      
      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex gap-8">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              {displayImages.map((img, i) => (
                <div key={img.id} onClick={() => setSelectedImg(i)} className={`w-16 h-16 border-2 rounded-lg cursor-pointer overflow-hidden flex items-center justify-center bg-gray-50 ${selectedImg === i ? 'border-blue-500' : 'border-gray-200'}`}>
                  {img.preview ? <img src={img.preview} className="w-full h-full object-cover" alt="" /> : <span className="text-xs text-gray-400">No img</span>}
                </div>
              ))}
            </div>
            <div className="w-72 h-72 border rounded-lg flex items-center justify-center bg-gray-50">
              {displayImages[selectedImg]?.preview ? <img src={displayImages[selectedImg].preview} className="max-w-full max-h-full object-contain" alt="" /> : <span className="text-gray-400">No Image</span>}
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-xl font-bold text-gray-900">{product.name || 'Product Name'}</h1>
              <Heart className="w-6 h-6 text-gray-300 cursor-pointer hover:text-red-400" />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-gray-300" />)}</div>
              <span className="text-sm text-gray-500">0 rating(s)</span>
              <span className="text-sm text-blue-600 cursor-pointer">Add a review</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-3">$150</p>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
              <p className="text-gray-600 text-sm">{product.shortDescription || defaultDesc}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 text-gray-600 hover:bg-gray-50">-</button>
                <span className="px-4 py-2 text-gray-900 font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-2 text-gray-600 hover:bg-gray-50">+</button>
              </div>
              <button className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border p-6">
        <div className="border-b border-gray-200 mb-6 flex gap-10">
          <button onClick={() => setTab('desc')} className={`pb-3 font-medium ${tab === 'desc' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Additional description</button>
          <button onClick={() => setTab('specs')} className={`pb-3 font-medium ${tab === 'specs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Specification</button>
          <button onClick={() => setTab('reviews')} className={`pb-3 font-medium ${tab === 'reviews' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Reviews (17)</button>
        </div>
        
        <div className="text-sm text-gray-700 mb-6 min-h-32">
          {tab === 'desc' && (
            <div>
              <p className="mb-4">{product.additionalDescription || defaultDesc}</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Fine Point For Precise, Detailed Writing</li>
                <li>Quick-Drying Ink Resists Smudging And Fading</li>
                <li>Writes On Paper, Plastic, Metal, And Glass</li>
                <li>Permanent, Waterproof Ink</li>
                <li>Pack Includes Black, Blue, Red, And Green</li>
              </ul>
            </div>
          )}
          {tab === 'specs' && (
            <div className="space-y-2">
              {product.specifications.length > 0 ? product.specifications.map((s, i) => (
                <p key={i}><strong className="text-gray-900">{s.name}:</strong> {s.value}</p>
              )) : <p>No specifications available.</p>}
            </div>
          )}
          {tab === 'reviews' && <p className="text-gray-500">No reviews yet.</p>}
        </div>
        
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button onClick={onSaveDraft} className="px-8 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">Save as Draft</button>
          <button onClick={onPublish} className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Publish Product</button>
        </div>
      </div>
    </div>
  );
}

function DraftsPage({ drafts, onBack, onEdit, onDelete, onClearAll, onAddNew }: { drafts: Product[]; onBack: () => void; onEdit: (p: Product) => void; onDelete: (id: string) => void; onClearAll: () => void; onAddNew: () => void }) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3"><button onClick={onBack}><ChevronLeft className="w-5 h-5 text-gray-600" /></button><h1 className="text-2xl font-bold text-gray-900">Drafts <span className="text-gray-400">{drafts.length}</span></h1></div>
        <div className="flex gap-3"><button onClick={onClearAll} className="px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50">Clear all</button><button onClick={onAddNew} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">+ Add New Product</button></div>
      </div>
      <div className="space-y-4">
        {drafts.map(d => (<div key={d.id} className="bg-white rounded-lg border p-4 flex items-center gap-4"><div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">{d.images[0] ? <img src={d.images[0].preview} className="max-h-full" alt="" /> : <span className="text-xs text-gray-400">No image</span>}</div><div className="flex-1"><p className="text-xs text-gray-500 mb-1">{d.createdAt}</p><h3 className="font-bold text-gray-900">{d.name}</h3><p className="text-sm text-gray-500">{d.category}</p><button onClick={() => onEdit(d)} className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded-lg">Edit Product</button></div><button onClick={() => onDelete(d.id)} className="text-red-500 p-2"><X className="w-5 h-5" /></button></div>))}
        {drafts.length === 0 && <p className="text-center text-gray-500 py-12">No drafts saved.</p>}
      </div>
    </div>
  );
}

export default function Page() {
  const [view, setView] = useState<'add' | 'preview' | 'drafts'>('add');
  const [drafts, setDrafts] = useState<Product[]>(sampleDrafts);
  const [product, setProduct] = useState<Product | null>(null);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState<'published' | 'draft' | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showClearAll, setShowClearAll] = useState(false);
  const [brands, setBrands] = useState(['Sharpie', 'Surard', 'Fellowes', '3M', 'HP']);

  const handlePreview = (p: Product) => { setProduct(p); setView('preview'); };
  const handleSaveDraft = (p: Product) => { setDrafts([{ ...p, id: Date.now().toString() }, ...drafts]); setShowSuccess('draft'); };

  return (
    <div className="min-h-screen bg-gray-50">
      {view === 'add' && <AddProductPage onPreview={handlePreview} onSaveDraft={handleSaveDraft} onViewDrafts={() => setView('drafts')} onAddBrand={() => setShowBrandModal(true)} brands={brands} />}
      {view === 'preview' && product && <PreviewPage product={product} onBack={() => setView('add')} onPublish={() => setShowSuccess('published')} onSaveDraft={() => setShowSuccess('draft')} />}
      {view === 'drafts' && <DraftsPage drafts={drafts} onBack={() => setView('add')} onEdit={p => { setProduct(p); setView('preview'); }} onDelete={setDeleteId} onClearAll={() => setShowClearAll(true)} onAddNew={() => setView('add')} />}
      {showBrandModal && <AddBrandModal onClose={() => setShowBrandModal(false)} onSave={n => { setBrands([...brands, n]); setShowBrandModal(false); }} />}
      {showSuccess && <SuccessModal type={showSuccess} onClose={() => { setShowSuccess(null); if (showSuccess === 'published') setView('add'); }} />}
      {deleteId && <DeleteModal title="Delete Draft?" message="Are you sure? This cannot be undone." onCancel={() => setDeleteId(null)} onConfirm={() => { setDrafts(drafts.filter(d => d.id !== deleteId)); setDeleteId(null); }} />}
      {showClearAll && <DeleteModal title="Clear All Drafts?" message="This will permanently delete all drafts." confirmText="Clear All" onCancel={() => setShowClearAll(false)} onConfirm={() => { setDrafts([]); setShowClearAll(false); }} />}
    </div>
  );
}

