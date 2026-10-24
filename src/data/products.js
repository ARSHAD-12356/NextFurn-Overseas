/* NextFurn Overseas product range used by the "Our Products" homepage section.
   Source PDFs (all w.e.f. 01 May 2026):
     NFSOC = "Nextfurn Overseas (NFSOC) Price list 2026.pdf"
     COLL  = "Nextfurn__Collection__2026 (1).pdf"
   `page` is the printed page number in that PDF. Prices are in INR exactly as listed.
   Each product's `variants` are genuine sibling models or listed options from the same row/series;
   the thumbnails switch between them. Ratings, reviews and discounts are not in the PDFs, so none are shown. */

const IMAGES = import.meta.glob('../assets/products-range/*.jpg', { eager: true, query: '?url', import: 'default' });
const img = (name) => {
  const url = IMAGES[`../assets/products-range/${name}.jpg`];
  if (!url) throw new Error(`Missing product image: ${name}.jpg`);
  return url;
};

export const CATEGORIES = [
  { id: 'office', label: 'Office Furniture', image: img('table-charm') },
  { id: 'sofa', label: 'Sofa & Lounge', image: img('diplomat-3') },
  { id: 'education', label: 'Education Furniture', image: img('student-1-two') },
  { id: 'healthcare', label: 'Healthcare Furniture', image: img('revive-pro') },
  { id: 'public', label: 'Public Seating', image: img('magnum-3') },
  { id: 'cafeteria', label: 'Cafeteria Furniture', image: img('gc-948-small') },
  { id: 'storage', label: 'Storage & Utility', image: img('gms-1') },
];

const v = (model, label, price, image, extra = {}) => ({ model, label, price, image: img(image), ...extra });

export const PRODUCTS = [
  // ---------- Office Furniture ----------
  { id: 'ditto', category: 'office', type: 'Mesh Chair', name: 'Ditto NF Chair', source: 'NFSOC p.2',
    desc: 'Ergonomic mesh back, fixed lumbar support, 3 years warranty',
    variants: [v('NF1', 'Black', 6500, 'ditto-black'), v('NF2', 'Grey', 8275, 'ditto-grey')] },
  { id: 'polar', category: 'office', type: 'Mesh Chair', name: 'Polar NF Chair', source: 'NFSOC p.2',
    desc: 'Glass fibre backrest, adjustable lumbar support, synchro mechanism',
    variants: [v('NF3', 'Black', 8863, 'polar-black'), v('NF4', 'Grey', 11813, 'polar-grey')] },
  { id: 'charm', category: 'office', type: 'Office Table', name: 'NF-Charm 1', source: 'COLL p.1',
    desc: 'MDF structure, teakwood, melamine polish, tile top · W2100 × D1600 × H750',
    variants: [v('NF-CHARM 1', 'W2100 × D1600', 305145, 'table-charm')] },
  { id: 'colton', category: 'office', type: 'Office Table', name: 'NF-Colton 1', source: 'COLL p.1',
    desc: 'MDF structure, veneer, PU paint · W2500 × D1900 × H750',
    variants: [v('NF-COLTON 1', 'W2500 × D1900', 367980, 'table-colton')] },
  { id: 'emerson', category: 'office', type: 'Office Table', name: 'NF-Emerson 1', source: 'COLL p.1',
    desc: 'MDF structure, laminated, PU paint · W2200 × D1800 × H750',
    variants: [v('NF-EMERSON 1', 'W2200 × D1800', 194760, 'table-emerson')] },
  { id: 'revival', category: 'office', type: 'Office Table', name: 'NF-Revival 1', source: 'COLL p.1',
    desc: 'MDF structure, membrane, PU paint · W3000 × D1800 × H750',
    variants: [v('NF-REVIVAL 1', 'W3000 × D1800', 265365, 'table-revival')] },

  // ---------- Sofa & Lounge (leatherette prices) ----------
  { id: 'diplomat', category: 'sofa', type: 'Sofa · Leatherette', name: 'NF-Diplomat Sofa', source: 'COLL p.17',
    desc: 'Wooden frame, wooden leg, tufted back',
    variants: [v('NF-DIPLOMAT 1', '1 Seater', 29970, 'diplomat-1'), v('NF-DIPLOMAT 2', '2 Seater', 39645, 'diplomat-2'), v('NF-DIPLOMAT 3', '3 Seater', 50400, 'diplomat-3')] },
  { id: 'regal', category: 'sofa', type: 'Sofa · Leatherette', name: 'NF-Regal Sofa', source: 'COLL p.17',
    desc: 'Wooden frame, cushion arm, tufted back, SS leg',
    variants: [v('NF-REGAL 1', '1 Seater', 41535, 'regal-1'), v('NF-REGAL 2', '2 Seater', 58950, 'regal-2'), v('NF-REGAL L', 'L-Shape', 167175, 'regal-l')] },
  { id: 'zap', category: 'sofa', type: 'Sofa · Leatherette', name: 'NF-Zap Sofa', source: 'COLL p.19',
    desc: 'Wooden frame, SS pipe leg frame',
    variants: [v('NF-ZAP 1', '1 Seater', 32895, 'zap-1'), v('NF-ZAP 2', '2 Seater', 39960, 'zap-2'), v('NF-ZAP 3', '3 Seater', 47160, 'zap-3')] },
  { id: 'columbia', category: 'sofa', type: 'Sofa · Leatherette', name: 'NF-Columbia Sofa', source: 'COLL p.21',
    desc: 'Wooden frame, SS pipe leg',
    variants: [v('NF-COLUMBIA 1', '1 Seater', 19080, 'columbia-1'), v('NF-COLUMBIA 2', '2 Seater', 26460, 'columbia-2'), v('NF-COLUMBIA 3', '3 Seater', 33885, 'columbia-3')] },

  // ---------- Education Furniture ----------
  { id: 'student-1', category: 'education', type: 'Student Desk', name: 'NF-Student 1', source: 'COLL p.39',
    desc: 'PLPB edge banded top, seat & back, powder coated pipe frame',
    variants: [v('NF-STUDENT 1', 'Two Seater', 15345, 'student-1-two'), v('NF-STUDENT 1', 'Three Seater', 19035, 'student-1-three')] },
  { id: 'student-2', category: 'education', type: 'Student Desk', name: 'NF-Student 2', source: 'COLL p.39',
    desc: 'PLPB edge banded top & seat back, powder coated pipe frame',
    variants: [v('NF-STUDENT 2', 'Single Seater', 9585, 'student-2-single'), v('NF-STUDENT 2', 'Two Seater', 14580, 'student-2-two')] },
  { id: 'student-7', category: 'education', type: 'Student Desk', name: 'NF-Student 7', source: 'COLL p.39',
    desc: 'Dual desk, PLPB top & seat back · Overall 900 × 900 × 640',
    variants: [v('NF-STUDENT 7', 'Two Seater', 12285, 'student-7')] },
  { id: 'student-10', category: 'education', type: 'Student Desk', name: 'NF-Student 10', source: 'COLL p.39',
    desc: 'Knockdown dual desk, post forming top · Overall 1065 × 950 × 750',
    variants: [v('NF-STUDENT 10', 'Two Seater', 14625, 'student-10')] },

  // ---------- Healthcare Furniture ----------
  { id: 'revive', category: 'healthcare', type: 'ICU Bed', name: 'NF-Revive ICU Bed', source: 'COLL p.49',
    desc: 'Motorized ICU bed, moulded polymer head & foot panel · 2140 × 1020 mm',
    variants: [v('NF-REVIVE PRO', 'Pro · 4 Motors', 182205, 'revive-pro'), v('NF-REVIVE VITAL', 'Vital · 4 Motors', 162585, 'revive-vital'), v('NF-REVIVE STANDARD', 'Standard · 3 Motors', 136620, 'revive-standard')] },
  { id: 'cure', category: 'healthcare', type: 'Fowler Electric Bed', name: 'NF-Cure Fowler Bed', source: 'COLL p.49',
    desc: 'Fowler electric bed, moulded polymer panels · 2100 × 1020 × 600 mm',
    variants: [v('NF-CURE VITAL', 'Vital', 97605, 'cure-vital'), v('NF-CURE ACTIVE', 'Active', 82890, 'cure-active'), v('NF-CURE FOWLER', 'Fowler', 91035, 'cure-fowler')] },
  { id: 'gk-1000', category: 'healthcare', type: 'ICU Bed', name: 'NF-GK 1000', source: 'COLL p.49',
    desc: 'ICU bed, adjustable backrest & upper leg · 2170 × 1050 mm',
    variants: [v('NF-GK 1000', 'ICU Bed', 71550, 'gk-1000')] },
  { id: 'gk-1003', category: 'healthcare', type: 'Fowler Bed', name: 'NF-GK 1003', source: 'COLL p.49',
    desc: 'Crank mechanism fowler bed · 2010 × 900 × 600 mm',
    variants: [v('NF-GK 1003', 'Fowler Bed', 40680, 'gk-1003')] },

  // ---------- Public Seating ----------
  { id: 'magnum', category: 'public', type: 'Waiting Seating', name: 'NF-Magnum Seating', source: 'COLL p.23',
    desc: 'Perforated powder coated seat & back, without cushion',
    variants: [v('NF-MAGNUM 1', '1 Seater', 13230, 'magnum-1'), v('NF-MAGNUM 3', '3 Seater', 18585, 'magnum-3'), v('NF-MAGNUM 4', '4 Seater', 20925, 'magnum-4')] },
  { id: 'magnum-ss', category: 'public', type: 'Waiting Seating · SS 202', name: 'NF-Magnum SS Seating', source: 'COLL p.23',
    desc: 'SS arms & legs, perforated seat & back, powder coated beam',
    variants: [v('NF-MAGNUM 5', '1 Seater', 12690, 'magnum-5'), v('NF-MAGNUM 6', '2 Seater', 15705, 'magnum-6'), v('NF-MAGNUM 7', '3 Seater', 20205, 'magnum-7')] },
  { id: 'cubis-3', category: 'public', type: 'Waiting Seating', name: 'NF-Cubis 3', source: 'COLL p.23',
    desc: '3 seater, perforated seat back, leatherette tapestry · 1750 × 630 × 810',
    variants: [v('NF-CUBIS 3', '3 Seater', 34425, 'cubis-3')] },
  { id: 'bennett-2', category: 'public', type: 'Waiting Seating', name: 'NF-Bennett 2', source: 'COLL p.23',
    desc: '2 seater, PP seat back, MS powder coated stand · 1150 × 460 × 840',
    variants: [v('NF-BENNETT 2', '2 Seater', 11205, 'bennett-2')] },

  // ---------- Cafeteria Furniture ----------
  { id: 'gc-948', category: 'cafeteria', type: 'Café Table', name: 'NF-GC 948', source: 'COLL p.31',
    desc: 'Chrome plated pipe stand, 25mm PLPB edge banded top',
    variants: [v('NF-GC 948', '1200 × 600', 9945, 'gc-948-small'), v('NF-GC 948', '1800 × 900', 13815, 'gc-948-large')] },
  { id: 'gc-928', category: 'cafeteria', type: 'Café Chair', name: 'NF-GC 928', source: 'COLL p.31',
    desc: 'Pipe frame, PP seat shell, chrome plated',
    variants: [v('NF-GC 928', 'Chrome Plated', 3060, 'gc-928')] },
  { id: 'gc-949', category: 'cafeteria', type: 'Lobby Chair', name: 'NF-GC 949', source: 'COLL p.31',
    desc: 'Chrome plated pipe frame, leatherette tapestry',
    variants: [v('NF-GC 949', 'Chrome Plated', 6885, 'gc-949')] },
  { id: 'gc-938', category: 'cafeteria', type: 'Bar Stool', name: 'NF-GC 938', source: 'COLL p.31',
    desc: 'Revolving bar stool, cushion seat, red leatherette tapestry',
    variants: [v('NF-GC 938', 'Revolving', 8370, 'gc-938')] },

  // ---------- Storage & Utility ----------
  { id: 'gms-vertical', category: 'storage', type: 'Vertical Filing Cabinet', name: 'NF-GMS Vertical Filing', source: 'COLL p.43',
    desc: 'Steel filing cabinet, 0.8mm thickness · W470 × D620',
    variants: [v('NF-GMS 1', '4 Drawers', 24435, 'gms-1'), v('NF-GMS 2', '3 Drawers', 19305, 'gms-2'), v('NF-GMS 3', '2 Drawers', 14175, 'gms-3')] },
  { id: 'gms-lateral', category: 'storage', type: 'Lateral Filing Cabinet', name: 'NF-GMS Lateral Filing', source: 'COLL p.43',
    desc: 'Steel lateral cabinet, 0.8mm thickness · W900 × D450',
    variants: [v('NF-GMS 7', '4 Drawers', 27675, 'gms-7'), v('NF-GMS 8', '3 Drawers', 24030, 'gms-8'), v('NF-GMS 9', '2 Drawers', 17730, 'gms-9')] },
  { id: 'gms-10', category: 'storage', type: 'Steel Almirah', name: 'NF-GMS 10', source: 'COLL p.43',
    desc: '2 doors, 4 adjustable shelves, 0.8mm · W900 × D450 × H1830',
    variants: [v('NF-GMS 10', '2 Doors', 31140, 'gms-10')] },
  { id: 'gms-12', category: 'storage', type: 'Steel Almirah', name: 'NF-GMS 12', source: 'COLL p.43',
    desc: '2 glass doors, 2 steel doors, 0.8mm · W900 × D450 × H1830',
    variants: [v('NF-GMS 12', 'Glass + Steel', 30465, 'gms-12')] },
];