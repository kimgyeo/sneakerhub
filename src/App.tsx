/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  Cpu, 
  Compass, 
  RotateCcw, 
  Activity, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  Info, 
  Eye, 
  ChevronRight, 
  Sliders, 
  ShieldAlert, 
  Flame, 
  Layers,
  Globe
} from "lucide-react";

import { COLORWAYS, SNEAKER_SPECS, HOTSPOTS } from "./data";
import { Colorway, SneakerSpec, InteractiveHotspot } from "./types";
// @ts-ignore
import SneakerImg from "./assets/images/clean_sneaker_1780284010853.png";
// @ts-ignore
import DetailMeshImg from "./assets/images/clean_mesh_1780284040704.png";
// @ts-ignore
import DetailSoleImg from "./assets/images/clean_sole_1780284055515.png";
// @ts-ignore
import DetailHeelImg from "./assets/images/clean_heel_1780284073047.png";

// Comprehensive localization dictionary with multilinguality and robust backup modes
const TRANSLATIONS: Record<string, Record<string, string>> = {
  ko: {
    navCustomize: "커스텀 튜닝",
    nav3DView: "3D 시뮬레이터",
    navAnalysis: "정밀 분석",
    specsArchive: "[ 스펙 아카이브 ]",
    acquireOrder: "[ 오더 신청 ]",
    overdriveActive: "오버드라이브: 활성화",
    overdriveOff: "오버드라이브: OFF",
    futureRunningSneaker: "FUTURE RUNNING SNEAKER",
    absolute: "ABSOLUTE",
    velocity: "VELOCITY",
    sloganDescPre: "공기처럼 가벼운 주행, ",
    sloganDescFit: "에어로다이나믹 실루엣",
    sloganDescPost: ". 군더더기 없는 슬릭 디자인 쉘과 고탄성 카본 블레이드가 융합되어, 더 세련되고 가뿐한 초경량 역동성을 구현합니다.",
    selectMatrixColor: "01 // 매트릭스 컬러 선택_",
    chooseChassisSize: "02 // 샤시 사이즈 선택 [KR]_",
    sizeAutoFitDesc: "스니커즈 오토 피팅 시스템으로 볼 너비 자동 제어",
    optionalHeelEngraving: "03 // 힐솔 옵션 각인 서비스_",
    placeholderEngraving: "예: RUN_900 (최대 8글자 영문/숫자)",
    clear: "지우기",
    liveSystemTelemetry: "LIVE SYSTEM TELEMETRY",
    overdriveBoosted: "오버드라이브: 용량 증폭됨",
    propulsionCoeff: "PROPULSION COEFF (추진계수)",
    impactDamping: "IMPACT DAMPING (충격감쇄)",
    specMatrixBtn: "SPEC_MATRIX",
    acquireBtn: "ACQUIRE",
    chassisRenderingProfile: "CHASSIS RENDERING PROFILE",
    structureMass: "Structure Mass",
    massOverdrive: "198.4g 오버드라이브",
    massOptimized: "198.4g 최적화 완료",
    kineticsLabSeedUnit: "KINETICS LAB SEED UNIT",
    kineticsGuide: "스니커즈 본체 노드를 가볍게 탭해 미래 공학 시스템을 탐색하세요.",
    nextNode: "다음 노드 탐색 [TAB_]",
    kineticsChassisDetail: "KINETICS  CHASSIS DETAIL_",
    close: "[닫기]",
    kineticChassisAnalysis: "04 // KINETIC CHASSIS ANALYSIS",
    macroAnalysisTitle: "고해상도 정방형 매크로 상세 분석 ",
    macroAnalysisTitleStroke: "3X PROFILE",
    microLog: "[MICRO_ENGINEERING_LOG] 미세 정밀 측정 카메라를 통한 핵심 모듈 1:1 실시간 상태 렌더링 세부 컷.",
    
    // Cards
    cardMeshTitle: "하이드로-메쉬 초탄성 조직",
    cardMeshDesc: "정밀 직조 결합으로 완성된 압도적인 통기성과 부드러우면서도 단단히 발을 지지해주는 초경량 스마트 메쉬 편조 설계.",
    cardSoleTitle: "카본 블레이드 추진 구조체",
    cardSoleDesc: "착지 순간 압축력을 전방 가속 추진력으로 온전히 반환하는 다이나믹 카본 화이버 레이아웃의 완전 반응형 솔 플레이트.",
    cardHeelTitle: "스마트 오토-피팅 감지 센서",
    cardHeelDesc: "사용자의 압력 중심점과 아킬레스건 기울기를 실시간 계측하여 뒤꿈치를 확실히 지탱해주는 동조 오토-피팅 감응 쉘.",

    // Footer
    footerWeight: "샤시 중량",
    footerCushioning: "쿠셔닝 시스템",
    footerPlate: "카본 플레이트",
    footerInventory: "라이브 재고: 소량 입고",
    footerProtocol: "제한 프로토콜 // 보안 액세스 승인됨",

    // Specs Modal
    specModalArchiveCode: "아카이브_코드: 스펙트라폰",
    specModalTitle: "X900-SPECIFICATIONS MATRIX",
    specModalSysClose: "SYS_CLOSE",

    // Order Modal
    orderModalMountProtocol: "오더 발급 프로토콜 적재",
    orderModalAbort: "[주문 중단]",
    orderModalSysId: "시스템 ID",
    orderModalCoreColor: "핵심 컬러웨이",
    orderModalDiagSize: "진단 사이즈",
    orderModalHeelEngrave: "힐 측면 각인",
    orderModalNone: "[없음]",
    orderModalEstPrice: "예상 가격",
    orderModalReceiverLabel: "RECEIVER NAME (수령인 성함)",
    orderModalReceiverPlaceholder: "수령인 성함을 입력하세요",
    orderModalContactLabel: "CONTACT MOBILE (연락처)",
    orderModalContactPlaceholder: "연락처를 입력하세요 (예: 010-0000-0000)",
    orderModalShippingLabel: "SHIPPING VECTOR (배송 주소)",
    orderModalShippingPlaceholder: "배송받으실 주소를 적어주세요",
    orderModalDisclaimer: "* 본 오더는 미래 지향적 컨셉 디자인 시연 시뮬레이션입니다.",
    orderModalAbortBtn: "다이얼 폐기",
    orderModalConfirmBtn: "오더 확정 전송",

    // Success Modal
    orderSuccessTitle: "오더 프로토콜 공식 승인 완료",
    orderSuccessDesc: "오더 수급 프로토콜 생성 완료. 고객님의 발 형태에 최적화된 맞춤 섬유 편조 및 결합 구조 공정 대기열 적재가 완료되었습니다.",
    orderSuccessSerial: "SERIAL_ID:",
    orderSuccessLine: "제조 공정 라인:",
    orderSuccessLineVal: "가상 물리 블록-D",
    orderSuccessQueue: "대기열 소요 주기:",
    orderSuccessQueueVal: "3D-사이클 소요 예상",
    orderSuccessReturnBtn: "시스템 복귀"
  },
  en: {
    navCustomize: "CUSTOMIZE",
    nav3DView: "3D SIMULATOR",
    navAnalysis: "MACRO ANALYSIS",
    specsArchive: "[ Spec Archive ]",
    acquireOrder: "[ Acquire Order ]",
    overdriveActive: "OVERDRIVE: ACTIVE",
    overdriveOff: "OVERDRIVE: OFF",
    futureRunningSneaker: "FUTURE RUNNING SNEAKER",
    absolute: "ABSOLUTE",
    velocity: "VELOCITY",
    sloganDescPre: "Light as air running, ",
    sloganDescFit: "aerodynamic silhouette",
    sloganDescPost: ". Effortless sleek design shell fused with high-elasticity carbon blades realization of refined, ultra-light dynamics.",
    selectMatrixColor: "01 // SELECT MATRIX COLOR_",
    chooseChassisSize: "02 // CHOOSE CHASSIS SIZE [KR]_",
    sizeAutoFitDesc: "Auto-fitting system dynamically adjusts width based on your stride",
    optionalHeelEngraving: "03 // OPTIONAL HEEL SOLE ENGRAVING_",
    placeholderEngraving: "e.g., RUN_900 (Max 8 alphanumeric characters)",
    clear: "CLEAR",
    liveSystemTelemetry: "LIVE SYSTEM TELEMETRY",
    overdriveBoosted: "OVERDRIVE: CAP BOOSTED",
    propulsionCoeff: "PROPULSION COEFF",
    impactDamping: "IMPACT DAMPING",
    specMatrixBtn: "SPEC_MATRIX",
    acquireBtn: "ACQUIRE",
    chassisRenderingProfile: "CHASSIS RENDERING PROFILE",
    structureMass: "Structure Mass",
    massOverdrive: "198.4g OVERDRIVE",
    massOptimized: "198.4g OPTIMIZED",
    kineticsLabSeedUnit: "KINETICS LAB SEED UNIT",
    kineticsGuide: "Tap the interactive hotspot nodes on the chassis to explore future engineering.",
    nextNode: "NEXT NODE [TAB_]",
    kineticsChassisDetail: "KINETICS CHASSIS DETAIL_",
    close: "[CLOSE]",
    kineticChassisAnalysis: "04 // KINETIC CHASSIS ANALYSIS",
    macroAnalysisTitle: "HIGH-RES SQUARE MACRO ANALYSIS ",
    macroAnalysisTitleStroke: "3X PROFILE",
    microLog: "[MICRO_ENGINEERING_LOG] High-precision microscopic scanner rendering core modules 1:1 in real-time.",

    // Cards
    cardMeshTitle: "Hydro-Mesh Hyper-Elastic Weave",
    cardMeshDesc: "Autofit knitted craft providing immense ventilation and lightweight smart mesh wrapping while robustly locking your feet in place.",
    cardSoleTitle: "Carbon Blade Propulsion Base",
    cardSoleDesc: "A fully responsive sole plate engineered from dynamic carbon-fiber layers, turning heel impact directly into forward kinetic momentum.",
    cardHeelTitle: "Smart Auto-Fitting Sensor",
    cardHeelDesc: "Synchronized automatic fitting panel providing solid heel support by analyzing real-time weight centroid shifts and achilles angle.",

    // Footer
    footerWeight: "CHASSIS WEIGHT",
    footerCushioning: "CUSHIONING SYSTEM",
    footerPlate: "CARBON PLATE",
    footerInventory: "LIVE INVENTORY: LOW STOCK",
    footerProtocol: "RESTRICTION PROTOCOL // SECURE ACCESS GRANTED",

    // Specs Modal
    specModalArchiveCode: "ARCHIVE_CODE: SPECTRAPHON",
    specModalTitle: "X900-SPECIFICATIONS MATRIX",
    specModalSysClose: "SYS_CLOSE",

    // Order Modal
    orderModalMountProtocol: "MOUNT ORDER PROTOCOL",
    orderModalAbort: "[ABORT]",
    orderModalSysId: "SYSTEM ID",
    orderModalCoreColor: "CORE COLOR",
    orderModalDiagSize: "DIAGNOSTIC SIZE",
    orderModalHeelEngrave: "HEEL ENGRAVE",
    orderModalNone: "[NONE]",
    orderModalEstPrice: "ESTIMATED PRICE",
    orderModalReceiverLabel: "RECEIVER NAME",
    orderModalReceiverPlaceholder: "Enter recipient full name",
    orderModalContactLabel: "CONTACT MOBILE",
    orderModalContactPlaceholder: "Enter contact number (e.g. 010-0000-0000)",
    orderModalShippingLabel: "SHIPPING VECTOR (ADDRESS)",
    orderModalShippingPlaceholder: "Enter your delivery shipping address",
    orderModalDisclaimer: "* This preorder is a futuristic concept design simulation preview.",
    orderModalAbortBtn: "ABORT_DIAL",
    orderModalConfirmBtn: "CONFIRM_ORDER",

    // Success Modal
    orderSuccessTitle: "ORDER PROTOCOL AUTHORIZED",
    orderSuccessDesc: "Order acquisition protocol generated successfully. Dynamic custom weave weaving and ergonomic chassis assembly logs have been pushed to manufacturing stack queues.",
    orderSuccessSerial: "SERIAL_ID:",
    orderSuccessLine: "PRODUCTION_LINE:",
    orderSuccessLineVal: "VIRTUAL BLOCK-D",
    orderSuccessQueue: "QUEUE_EST:",
    orderSuccessQueueVal: "3 D-CYCLES",
    orderSuccessReturnBtn: "RETURN_SYS"
  },
  es: {
    navCustomize: "Personalizar",
    nav3DView: "Simulador 3D",
    navAnalysis: "Análisis preciso",
    specsArchive: "[ Matriz de Specs ]",
    acquireOrder: "[ Solicitar Orden ]",
    overdriveActive: "OVERDRIVE: ACTIVO",
    overdriveOff: "OVERDRIVE: APAGADO",
    futureRunningSneaker: "SNEAKER SPRINT DEL FUTURO",
    absolute: "ABSOLUTO",
    velocity: "VELOCIDAD",
    sloganDescPre: "Carrera liviana como el aire, ",
    sloganDescFit: "silueta aerodinámica",
    sloganDescPost: ". Estética depurada que fusiona diseño minimalista y palas de carbono altamente elásticas, logrando dinámicas ultraligeras incomparables.",
    selectMatrixColor: "01 // SELECCIONAR COLOR_DE MATRIZ",
    chooseChassisSize: "02 // TALLA DEL CHASIS [KR]_",
    sizeAutoFitDesc: "Ajuste dinámico automatizado de anchura basado en su pisada",
    optionalHeelEngraving: "03 // GRABADO PERSONALIZADO EN TALÓN_",
    placeholderEngraving: "Ej: RUN_900 (Máx. 8 letras/números)",
    clear: "BORRAR",
    liveSystemTelemetry: "LIVE SYSTEM TELEMETRY",
    overdriveBoosted: "OVERDRIVE: EFICIENCIA EXTREMA",
    propulsionCoeff: "COEFICIENTE DE PROPULSIÓN",
    impactDamping: "AMORTIGUACIÓN DE IMPACTO",
    specMatrixBtn: "SPEC_MATRIX",
    acquireBtn: "ACQUIRE",
    chassisRenderingProfile: "PERFIL DE RENDER DEL CHASIS",
    structureMass: "Masa de Estructura",
    massOverdrive: "198.4g Overdrive activo",
    massOptimized: "198.4g Optimizado",
    kineticsLabSeedUnit: "KINETICS LAB SEED UNIT",
    kineticsGuide: "Interactúe con los puntos calientes para explorar la ingeniería avanzada del chasis.",
    nextNode: "SIGUIENTE NODO [TAB_]",
    kineticsChassisDetail: "KINETICS CHASSIS DETAIL_",
    close: "[CERRAR]",
    kineticChassisAnalysis: "04 // KINETIC CHASSIS ANALYSIS",
    macroAnalysisTitle: "ANÁLISIS MACRO DE ALTA RESOLUCIÓN ",
    macroAnalysisTitleStroke: "PERFIL 3X",
    microLog: "[LOG RES] Perfil 1:1 renderizado por escáner de calor nanométrico de precisión.",
    cardMeshTitle: "Tejido flexible Hydro-Mesh",
    cardMeshDesc: "Combinación ideal de transpirabilidad y sujeción ultraligera que envuelve y afianza el pie de manera firme.",
    cardSoleTitle: "Palas de empuje de fibra de carbono",
    cardSoleDesc: "Placa reactiva de capas de carbono de alto impacto que transfiere la fuerza hacia adelante.",
    cardHeelTitle: "Sensor adaptativo de ajuste de tobillo",
    cardHeelDesc: "Monitoreo constante del talón y tendón de Aquiles para máxima fijación de pisada dinámica.",
    footerWeight: "PESO DEL CHASIS",
    footerCushioning: "AMORTIGUACIÓN",
    footerPlate: "PLACA DE CARBONO",
    footerInventory: "INVENTARIO: STOCK LIMITADO",
    footerProtocol: "PROTOCOLO DE SEGURIDAD PRIVADO // CONEXIÓN ESTABLECIDA",
    specModalArchiveCode: "CÓDIGO DE ARCHIVO: SPECTRAPHON",
    specModalTitle: "FICHA TÉCNICA X900 SPECIFICATIONS",
    specModalSysClose: "CERRAR_SIS",
    orderModalMountProtocol: "SISTEMA DE PROTOCOLO DE ORDEN",
    orderModalAbort: "[ABORTAR]",
    orderModalSysId: "SYSTEM ID",
    orderModalCoreColor: "COLOR PRINCIPAL",
    orderModalDiagSize: "TALLA DIAGNÓSTICO",
    orderModalHeelEngrave: "GRABADO DE TALÓN",
    orderModalNone: "[NINGUNO]",
    orderModalEstPrice: "COSTO ESTIMADO",
    orderModalReceiverLabel: "ORGANISMO DESTINATARIO",
    orderModalReceiverPlaceholder: "Nombre completo del recibidor",
    orderModalContactLabel: "TELÉFONO DE CONTACTO",
    orderModalContactPlaceholder: "Ej: 010-0000-0000",
    orderModalShippingLabel: "VECTOR DE ENVÍO (DIRECCIÓN)",
    orderModalShippingPlaceholder: "Ingrese la dirección de destino",
    orderModalDisclaimer: "* Este pedido es un proceso de simulación online para un concepto tecnológico futurista.",
    orderModalAbortBtn: "DESCARTAR_DIAL",
    orderModalConfirmBtn: "CONFIRM_Y_ENVIAR",
    orderSuccessTitle: "ORDEN PROCESADA Y REGISTRADA CIV_D",
    orderSuccessDesc: "Protocolo cargado. Su tejido premium personalizado y su chasis anatómico han ingresado a la línea de ensamblaje automático.",
    orderSuccessSerial: "SERIAL_ID:",
    orderSuccessLine: "MONTAJE DIGITAL:",
    orderSuccessLineVal: "GLOBAL MODULE D",
    orderSuccessQueue: "CICLO MEDIO:",
    orderSuccessQueueVal: "3 COMP_CYCLES",
    orderSuccessReturnBtn: "VOLVER"
  }
};

// Multi-language definitions with local translations or fallback to standard English
const LANGUAGES = [
  { code: "ko", label: "KO", name: "한국어" },
  { code: "en", label: "EN", name: "English" },
  { code: "es", label: "ES", name: "Español" }
];

export default function App() {
  // Application Language State with beautiful dropdown control
  const [lang, setLang] = useState<string>("ko");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);

  // Helper function to resolve translated string keys smoothly
  const t = (key: keyof typeof TRANSLATIONS.ko) => {
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || TRANSLATIONS.ko[key];
  };

  // Application State
  const [selectedColorway, setSelectedColorway] = useState<Colorway>(COLORWAYS[0]);
  const [selectedSize, setSelectedSize] = useState<number>(270); // standard KR size
  const [engravingText, setEngravingText] = useState<string>("");
  const [isOverdrive, setIsOverdrive] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<InteractiveHotspot | null>(null);
  const [showSpecsModal, setShowSpecsModal] = useState<boolean>(false);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  const [orderCompleted, setOrderCompleted] = useState<boolean>(false);
  const [orderSerial, setOrderSerial] = useState<string>("");

  // Simulated live sizes for Korean layout (KR mm sizes)
  const sizes = [250, 260, 265, 270, 275, 280, 285, 290];

  // Calculate dynamic stats based on Overdrive state
  const performanceStats = useMemo(() => {
    const multiplier = isOverdrive ? 1.18 : 1.0;
    return {
      propulsion: Math.min(100, Math.round(85 * multiplier)),
      cushioning: Math.min(100, Math.round(92 * multiplier)),
      aerodynamics: Math.min(100, Math.round(88 * multiplier)),
      responsiveness: Math.min(100, Math.round(90 * multiplier))
    };
  }, [isOverdrive]);

  // Handle preorder generation
  const handlePreOrderInit = () => {
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    setOrderSerial(`X900-KR-${randomHex}-${selectedSize}`);
    setOrderCompleted(false);
    setShowOrderModal(true);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderCompleted(true);
  };

  // Resolve localized dynamic fields
  const activeColorwayName = lang === "en" ? (selectedColorway.nameEn || selectedColorway.name) : selectedColorway.name;
  const activeColorwayDesc = lang === "en" ? (selectedColorway.descriptionEn || selectedColorway.description) : selectedColorway.description;

  return (
    <div className={`min-h-screen bg-black font-sans selection:bg-neon-lime/30 selection:text-white transition-colors duration-1000 overflow-x-hidden relative ${isOverdrive ? 'bg-black' : ''}`}>
      {/* Absolute Geometric Editorial Line Elements */}
      <div className="absolute inset-x-0 top-[12%] h-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-[18%] h-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute left-[38%] inset-y-0 w-[1px] bg-white/5 pointer-events-none hidden lg:block" />
      
      {/* Editorial Navigation Header */}
      <header className="border-b border-white/10 px-3 sm:px-6 py-2 sm:py-4 flex flex-col md:flex-row items-stretch md:items-center justify-between fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md gap-2 md:gap-3 shadow-md md:h-[68px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between md:justify-start gap-2.5 sm:gap-4 w-full md:w-auto">
          <div className="flex flex-col">
            <span className="font-display font-black text-lg sm:text-2xl tracking-tighter text-white uppercase flex items-center gap-1 leading-none">
              AETHER.RUN <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-500 bg-white/5 px-1.5 py-0.5 border border-white/10 rounded-sm">X900</span>
            </span>
            <span className="text-[7px] tracking-[0.3em] text-neon-lime uppercase font-bold mt-0.5 leading-none">
              {lang === "en" ? "Advanced Kinetics Lab" : "첨단 운동역학 연구소"}
            </span>
          </div>

          {/* Quick jump navigation button segment for mobile */}
          <div className="flex items-center gap-1 md:hidden overflow-x-auto py-0.5 scrollbar-none no-scrollbar w-full sm:w-auto justify-start sm:justify-start">
            <button
              onClick={() => document.getElementById("interactive-3d-view")?.scrollIntoView({ behavior: "smooth" })}
              className="text-[8px] font-mono uppercase bg-zinc-950/80 border border-white/10 text-zinc-400 font-bold px-1.5 py-0.5 rounded-none hover:text-neon-lime hover:border-neon-lime text-center h-[22px] flex items-center"
            >
              3D
            </button>
            <button
              onClick={() => document.getElementById("hero-details-column")?.scrollIntoView({ behavior: "smooth" })}
              className="text-[8px] font-mono uppercase bg-zinc-950/80 border border-white/10 text-zinc-400 font-bold px-1.5 py-0.5 rounded-none hover:text-neon-lime hover:border-neon-lime text-center h-[22px] flex items-center"
            >
              {lang === "en" ? "TUNE" : "튜닝"}
            </button>
            <button
              onClick={() => document.getElementById("macro-analysis")?.scrollIntoView({ behavior: "smooth" })}
              className="text-[8px] font-mono uppercase bg-zinc-950/80 border border-white/10 text-zinc-400 font-bold px-1.5 py-0.5 rounded-none hover:text-neon-lime hover:border-neon-lime text-center h-[22px] flex items-center"
            >
              {lang === "en" ? "MACRO" : "분석"}
            </button>
          </div>
        </div>

        {/* Dynamic Navigation & Jumps for Desktop / Laptop screen layout */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-[10px] lg:text-[11px] font-mono font-bold tracking-wider text-zinc-455">
          <button 
            onClick={() => document.getElementById("interactive-3d-view")?.scrollIntoView({ behavior: "smooth" })}
            className="hover:text-neon-lime hover:underline underline-offset-4 transition-all duration-200 uppercase cursor-pointer"
          >
            01// {t("nav3DView")}
          </button>
          <span className="text-white/10">|</span>
          <button 
            onClick={() => document.getElementById("hero-details-column")?.scrollIntoView({ behavior: "smooth" })}
            className="hover:text-neon-lime hover:underline underline-offset-4 transition-all duration-200 uppercase cursor-pointer"
          >
            02// {t("navCustomize")}
          </button>
          <span className="text-white/10">|</span>
          <button 
            onClick={() => document.getElementById("macro-analysis")?.scrollIntoView({ behavior: "smooth" })}
            className="hover:text-neon-lime hover:underline underline-offset-4 transition-all duration-200 uppercase cursor-pointer"
          >
            03// {t("navAnalysis")}
          </button>
        </div>

        {/* Global Controls: Language, Order & Overdrive */}
        <div className="flex items-center justify-between md:justify-end gap-2 md:gap-4 border-t border-white/5 pt-1.5 md:pt-0 md:border-t-0 w-full md:w-auto">
          <button
            onClick={handlePreOrderInit}
            className="md:hidden py-0.5 px-2 bg-neon-lime text-black border border-neon-lime text-[8px] font-mono font-bold hover:bg-white tracking-wider cursor-pointer h-[24px] flex items-center"
          >
            {lang === "en" ? "ORDER" : "신청"}
          </button>

          <div className="hidden lg:block">
            <button 
              onClick={handlePreOrderInit} 
              className="hover:text-neon-lime text-neon-lime text-[11px] font-bold tracking-widest uppercase transition-colors cursor-pointer"
            >
              {t("acquireOrder")}
            </button>
          </div>

          {/* Symmetrical Brutalist Language Switcher Dropdown (Abbreviated grid) */}
          <div className="relative z-50">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1 px-2 h-[24px] sm:h-[32px] border border-white/15 bg-zinc-950 font-mono text-[8px] sm:text-[10px] text-white hover:text-neon-lime hover:border-neon-lime/45 transition-colors cursor-pointer"
              title="Change System Language / 글로벌 언어 설정"
            >
              <Globe className="w-3.5 h-3.5 text-zinc-400" />
              <span className="uppercase font-bold tracking-wider">{lang}</span>
            </button>
            
            {isLangDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40 bg-transparent" 
                  onClick={() => setIsLangDropdownOpen(false)} 
                />
                <div className="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 mt-2 sm:w-[320px] bg-black border border-white/15 p-2.5 z-50 shadow-2xl font-mono text-[9px] sm:text-[10px]">
                  <div className="text-[8.5px] tracking-widest text-zinc-500 uppercase pb-1.5 mb-2 border-b border-white/10 font-bold flex justify-between items-center">
                    <span>{lang === "ko" ? "글로벌 언어 설정 테이블" : "GLOBAL DIAL MAPPED LANGUAGES"}</span>
                    <span className="text-neon-lime">GOOGLE_TRANS_REF</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 max-h-[220px] overflow-y-auto pr-1 no-scrollbar scrollbar-thin">
                    {LANGUAGES.map((item) => {
                      const isActive = lang === item.code;
                      return (
                        <button
                          key={item.code}
                          onClick={() => {
                            setLang(item.code);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`py-1.5 rounded-none flex flex-col items-center justify-center border font-mono transition-all cursor-pointer ${
                            isActive
                              ? "bg-white text-black border-white font-black"
                              : "border-white/5 bg-zinc-950 hover:bg-white/5 hover:border-white/20 text-zinc-400 hover:text-white"
                          }`}
                          title={item.name}
                        >
                          <span className="font-bold">{item.label}</span>
                          <span className="text-[7px] tracking-normal text-zinc-500 scale-90 truncate max-w-full block leading-none mt-0.5">
                            {item.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Engine Overdrive switch */}
          <button 
            id="overdrive-toggle"
            onClick={() => setIsOverdrive(!isOverdrive)}
            className={`flex items-center gap-1 px-2 border transition-all duration-300 cursor-pointer h-[24px] sm:h-[32px] ${
              isOverdrive 
                ? "border-red-500 bg-red-950/20 text-red-400 shadow-md shadow-red-500/20"
                : "border-white/10 bg-zinc-950 text-white/50 hover:text-neon-lime hover:border-neon-lime/40"
            }`}
          >
            <Zap className={`w-3 h-3 ${isOverdrive ? "animate-bounce text-red-150" : ""}`} />
            <span className="font-mono text-[8px] sm:text-[10px] font-bold tracking-wider">
              {isOverdrive ? t("overdriveActive") : t("overdriveOff")}
            </span>
          </button>
        </div>
      </header>

      {/* Main Grid View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-[145px] sm:pt-[130px] md:pt-[100px] pb-6 md:pb-12 flex flex-col gap-6 md:gap-10 relative z-10">
        
        {/* MOBILE & TABLET CAMPAIGN HEADER (Visible only below lg breakpoint) */}
        <div className="lg:hidden flex flex-col gap-4">
          <div className={`inline-block px-3 py-1.5 text-[10px] font-black tracking-widest uppercase transition-all duration-300 self-start ${
            isOverdrive 
              ? "bg-red-500 text-black" 
              : "bg-neon-lime text-black"
          }`}>
            {t("futureRunningSneaker")}
          </div>

          <h1 className="font-display font-black text-[42px] sm:text-[54px] md:text-[64px] leading-[0.85] tracking-tighter text-white">
            {t("absolute")}<br />
            <span 
              className="text-transparent font-black uppercase transition-all duration-500 select-none stroke-text-white block mt-1"
              style={{
                WebkitTextStroke: isOverdrive 
                  ? "1px #ef4444" 
                  : selectedColorway.id === "aether_neon"
                  ? "2px #D4FF00"
                  : selectedColorway.id === "cyan_shock"
                  ? "1px #22d3ee"
                  : selectedColorway.id === "magma_burst"
                  ? "1px #f97316"
                  : "1px #ffffff"
              }}
            >
              {t("velocity")}
            </span>
          </h1>

          <p className="text-zinc-300 font-sans font-light text-sm sm:text-base leading-relaxed max-w-xl">
            {t("sloganDescPre")}
            <span className={`font-semibold italic underline underline-offset-8 transition-all duration-300 decoration-1 ${
              isOverdrive 
                ? "text-red-400 decoration-red-500" 
                : "text-white decoration-neon-lime"
            }`}>
              {t("sloganDescFit")}
            </span>
            {t("sloganDescPost")}
          </p>
        </div>

        {/* Dynamic Column Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch w-full">
          
          {/* LEFT COLUMN: CUSTOMIZATION PROTOCOL & PERFORMANCE MAPPING */}
          <div id="hero-details-column" className="lg:col-span-5 flex flex-col justify-between space-y-6 md:space-y-8 lg:pr-4 order-2 lg:order-1 scroll-mt-36 md:scroll-mt-24">
            <div className="space-y-6">
              
              {/* DESKTOP-ONLY SLOGAN BOX (Hidden below lg breakpoint) */}
              <div className="hidden lg:block space-y-6">
                <div className={`inline-block px-3 py-1.5 text-[10px] font-black tracking-widest uppercase transition-all duration-300 self-start ${
                  isOverdrive 
                    ? "bg-red-500 text-black" 
                    : "bg-neon-lime text-black"
                }`}>
                  {t("futureRunningSneaker")}
                </div>

                <div className="space-y-3">
                  <h1 id="landing-main-title" className="font-display font-black text-[54px] sm:text-[68px] lg:text-[76px] xl:text-[84px] leading-[0.85] tracking-tighter text-white">
                    {t("absolute")}<br />
                    <span 
                      className="text-transparent font-black uppercase transition-all duration-500 select-none stroke-text-white block mt-1"
                      style={{
                        WebkitTextStroke: isOverdrive 
                          ? "1px #ef4444" 
                          : selectedColorway.id === "aether_neon"
                          ? "2px #D4FF00"
                          : selectedColorway.id === "cyan_shock"
                          ? "1px #22d3ee"
                          : selectedColorway.id === "magma_burst"
                          ? "1px #f97316"
                          : "1px #ffffff"
                      }}
                    >
                      {t("velocity")}
                    </span>
                  </h1>

                  <div className="flex items-start gap-4 pt-3">
                    <div className={`w-12 h-[2px] mt-3.5 opacity-40 transition-all duration-300 ${
                      isOverdrive ? "bg-red-500" : "bg-neon-lime"
                    }`} />
                    <p className="text-zinc-300 font-sans font-light text-base sm:text-lg leading-relaxed max-w-md">
                      {t("sloganDescPre")}
                      <span className={`font-semibold italic underline underline-offset-8 transition-all duration-300 decoration-1 ${
                        isOverdrive 
                          ? "text-red-400 decoration-red-500" 
                          : "text-white decoration-neon-lime"
                      }`}>
                        {t("sloganDescFit")}
                      </span>
                      {t("sloganDescPost")}
                    </p>
                  </div>
                </div>
              </div>

              {/* COLORWAY SELECTION BUTTONS */}
              <div className="pt-4 lg:pt-6 border-t border-white/10 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-zinc-500 tracking-wider">{t("selectMatrixColor")}</span>
                  <span className={`font-mono font-bold tracking-widest ${selectedColorway.textColor}`}>
                    {activeColorwayName}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  {COLORWAYS.map((cway) => (
                    <button
                      key={cway.id}
                      onClick={() => {
                        setSelectedColorway(cway);
                        setActiveHotspot(null);
                      }}
                      className={`w-12 h-12 rounded-none flex items-center justify-center transition-all duration-300 relative border cursor-pointer ${
                        selectedColorway.id === cway.id 
                          ? `border-white bg-zinc-900 ${cway.glowClass}`
                          : "border-white/10 bg-black hover:border-white/40"
                      }`}
                    >
                      <div className="flex gap-[2px]">
                        <span className={`w-3.5 h-3.5 rounded-full ${
                          cway.id === "aether_neon" ? "bg-neon-lime" :
                          cway.id === "cyan_shock" ? "bg-cyan-400" :
                          cway.id === "magma_burst" ? "bg-orange-500" : "bg-white"
                        }`} />
                      </div>
                      {selectedColorway.id === cway.id && (
                        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${
                          isOverdrive ? "bg-red-500" : "bg-neon-lime"
                        }`} />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-zinc-400 italic mt-1.5 min-h-[32px] font-sans font-light leading-relaxed">
                  * {activeColorwayDesc}
                </p>
              </div>

              {/* DYNAMIC FIT SIZE SELECTION */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex justify-between items-center text-xs w-full">
                  <span className="font-mono text-zinc-500 tracking-wider">{t("chooseChassisSize")}</span>
                  <span className="font-mono font-bold text-white tracking-widest">
                    {selectedSize} mm
                  </span>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-mono rounded-none cursor-pointer transition-all duration-200 border ${
                        selectedSize === size
                          ? "bg-white text-black border-white font-bold"
                          : "bg-black text-zinc-400 border-white/10 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
                  <Info className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                  <span>{t("sizeAutoFitDesc")}</span>
                </div>
              </div>

              {/* EXCITING INITIALS PERSONALIZATION */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="font-mono text-[10px] text-zinc-500 block uppercase tracking-wider">{t("optionalHeelEngraving")}</span>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={8}
                    placeholder={t("placeholderEngraving")}
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                    className="w-full bg-zinc-950/70 border border-white/10 leading-none py-2.5 px-3 rounded-none text-white font-mono text-xs placeholder:text-zinc-650 focus:outline-none focus:border-neon-lime transition-all"
                  />
                  {engravingText && (
                    <button
                      onClick={() => setEngravingText("")}
                      className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-200 text-xs font-mono"
                    >
                      {t("clear").toUpperCase()}
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* TELEMETRY TELE PORT METRICS */}
            <div className="pt-4 lg:pt-6 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">{t("liveSystemTelemetry")}</span>
                {isOverdrive && (
                  <span className="font-mono text-[9px] text-red-400 bg-red-950/40 px-2 py-0.5 rounded-sm border border-red-500/20 animate-pulse font-bold">
                    {t("overdriveBoosted")}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {/* Propulsion bar */}
                <div>
                  <div className="flex justify-between text-[11px] font-mono mb-1">
                    <span className="text-zinc-400">{t("propulsionCoeff")}</span>
                    <span className={isOverdrive ? "text-red-400 font-bold" : selectedColorway.textColor}>
                      {performanceStats.propulsion}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-none overflow-hidden">
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${performanceStats.propulsion}%` }}
                       transition={{ duration: 0.5 }}
                       className={`h-full ${
                         isOverdrive 
                           ? "bg-red-500" 
                           : selectedColorway.id === "aether_neon"
                           ? "bg-neon-lime"
                           : selectedColorway.textColor.replace('text-', 'bg-')
                       }`} 
                    />
                  </div>
                </div>

                {/* Cushioning bar */}
                <div>
                  <div className="flex justify-between text-[11px] font-mono mb-1">
                    <span className="text-zinc-400">{t("impactDamping")}</span>
                    <span className={isOverdrive ? "text-red-400 font-bold" : selectedColorway.textColor}>
                      {performanceStats.cushioning}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-none overflow-hidden">
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${performanceStats.cushioning}%` }}
                       transition={{ duration: 0.5 }}
                       className={`h-full ${
                         isOverdrive 
                           ? "bg-red-500" 
                           : selectedColorway.id === "aether_neon"
                           ? "bg-neon-lime"
                           : selectedColorway.textColor.replace('text-', 'bg-')
                       }`} 
                    />
                  </div>
                </div>
              </div>

              {/* ACTION TRIGGERS BUTTONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setShowSpecsModal(true)}
                  className="py-3 px-4 border border-white/10 text-zinc-300 rounded-none text-xs font-mono font-bold hover:bg-white hover:text-black hover:border-white transition duration-200 flex items-center justify-center gap-2 cursor-pointer w-full"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{t("specMatrixBtn")}</span>
                </button>

                <button
                  onClick={handlePreOrderInit}
                  className={`py-3 px-4 rounded-none text-xs font-mono font-black tracking-widest transition duration-300 flex items-center justify-center gap-2 cursor-pointer w-full ${
                    selectedColorway.id === 'aether_neon' 
                      ? 'bg-neon-lime text-black hover:bg-white shadow-lg' 
                      : selectedColorway.bgButtonClass
                  }`}
                >
                  <span>{t("acquireBtn")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: CINEMATIC SNEAKER GRAPHIC & HOTSPOTS */}
          <div id="interactive-3d-view" className="lg:col-span-7 flex flex-col justify-between relative border border-white/10 bg-gradient-to-tr from-[#0a0a0a] to-[#1a1a1a] rounded-3xl p-4 sm:p-6 md:p-8 min-h-[380px] sm:min-h-[460px] md:min-h-[580px] overflow-hidden order-1 lg:order-2 scroll-mt-36 md:scroll-mt-24">
            
            {/* Ambient glows */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <div className={`w-[200px] sm:w-[260px] md:w-[440px] h-[200px] sm:h-[260px] md:h-[440px] rounded-full filter blur-[80px] sm:blur-[100px] md:blur-[160px] opacity-75 transition-all duration-1000 bg-gradient-to-tr ${
                isOverdrive 
                  ? "from-red-500/20 via-transparent text-red-500/10" 
                  : selectedColorway.id === "aether_neon"
                  ? "from-[rgba(212,255,0,0.18)] via-transparent"
                  : selectedColorway.id === "cyan_shock"
                  ? "from-cyan-500/20 via-transparent"
                  : selectedColorway.id === "magma_burst"
                  ? "from-orange-500/20 via-transparent"
                  : "from-zinc-500/10 via-transparent"
              }`} />
            </div>

            {/* Dynamic Technical Wireframe Header */}
            <div className="flex justify-between items-start z-10 border-b border-white/5 pb-4">
              <div>
                <span className="font-mono text-[9px] text-zinc-500 tracking-[0.2em] block uppercase">{t("chassisRenderingProfile")}</span>
                <span className="text-xs sm:text-sm uppercase font-display tracking-wider text-white font-black">
                  X900_ENGINE_LABS.OBJ
                </span>
              </div>
              
              <div className="text-right">
                <span className="font-mono text-[9px] text-zinc-500 block uppercase tracking-[0.1em]">{t("structureMass")}</span>
                <span className="font-mono text-xs sm:text-sm text-neon-lime font-black uppercase text-right block">
                  {isOverdrive ? t("massOverdrive") : t("massOptimized")}
                </span>
              </div>
            </div>

            {/* SNEAKER INTERACTIVE MAIN CONTAINER */}
            <div className="flex-1 flex items-center justify-center relative my-4 sm:my-6 md:my-0 select-none">
              
              {isOverdrive && (
                <motion.div 
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-red-500/40 shadow-[0_0_15px_#ef4444] z-10 pointer-events-none" 
                />
              )}

              {/* Ring */}
              <div className={`absolute w-[180px] sm:w-[240px] md:w-[380px] h-[180px] sm:h-[240px] md:h-[380px] rounded-full border border-dashed transition-all duration-1000 ${
                isOverdrive 
                  ? "border-red-500/20 animate-spin" 
                  : selectedColorway.id === "aether_neon"
                  ? "border-neon-lime/20"
                  : selectedColorway.id === "cyan_shock"
                  ? "border-cyan-500/10"
                  : selectedColorway.id === "magma_burst"
                  ? "border-orange-500/10 animate-[spin_100s_linear_infinite]"
                  : "border-white/10"
              }`} style={{ transform: "rotateX(75deg)" }} />

              {/* Hover-Motion asset */}
              <motion.div
                animate={isOverdrive ? {
                  y: [0, -12, 0, -6, 0],
                  rotateZ: [0, 1, -1, 0]
                } : {
                  y: [-6, 6, -6],
                }}
                transition={isOverdrive ? {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                } : {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10 max-w-[240px] sm:max-w-[340px] md:max-w-[460px] p-4 transition-all duration-1000"
              >
                <img
                  src={SneakerImg}
                  alt="Aether Speed Sneaker"
                  referrerPolicy="no-referrer"
                  className={`w-full h-auto drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] object-contain transition-all duration-1000 ${
                    selectedColorway.hueClass
                  }`}
                />

                {/* HEEL ENGRAVING PREVIEW */}
                {engravingText && (
                  <div className="absolute right-[21%] bottom-[29%] rotate-[-22deg] scale-[0.5] sm:scale-[0.6] md:scale-[0.8] opacity-85 z-20 pointer-events-none">
                    <div className={`px-2 py-0.5 rounded font-mono text-[8px] sm:text-[9px] font-bold border ${
                      isOverdrive 
                        ? "border-red-500/40 bg-zinc-950 text-red-400" 
                        : `border-neon-lime bg-black text-neon-lime`
                    } tracking-widest`}>
                      {engravingText}
                    </div>
                  </div>
                )}

                {/* SNEAKER HOTSPOTS */}
                <div className="absolute inset-0 z-20 font-sans">
                  {HOTSPOTS.map((spot) => {
                    const isActive = activeHotspot?.id === spot.id;
                    const spotTitle = lang === "en" ? (spot.titleEn || spot.title) : spot.title;
                    return (
                      <div
                        key={spot.id}
                        className="absolute transition-all duration-300"
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      >
                        <button
                          onClick={() => setActiveHotspot(isActive ? null : spot)}
                          className="relative flex items-center justify-center cursor-pointer group focus:outline-none"
                        >
                          <span className={`absolute inline-flex h-5 w-5 sm:h-6 sm:w-6 rounded-full opacity-60 animate-ping duration-1000 ${
                            isOverdrive 
                              ? "bg-red-450" 
                              : selectedColorway.id === "aether_neon"
                              ? "bg-neon-lime"
                              : "bg-white"
                          }`} />
                          
                          <span className={`relative rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 flex items-center justify-center transition-all duration-100 border ${
                            isActive 
                              ? "bg-white border-black scale-125 shadow-lg" 
                              : isOverdrive 
                              ? "bg-black border-red-500 group-hover:bg-red-500" 
                              : selectedColorway.id === "aether_neon"
                              ? "bg-black border-neon-lime group-hover:bg-neon-lime"
                              : `bg-black border-${selectedColorway.textColor.split('-')[1] || 'white'} group-hover:bg-white`
                          }`} />

                          {/* Hover Tooltip on Desktop */}
                          <span className="opacity-0 group-hover:opacity-100 absolute bottom-6 left-1/2 -translate-x-1/2 w-48 bg-zinc-900 border border-white/10 p-2 rounded text-[10px] text-zinc-300 font-mono text-center pointer-events-none transition-opacity duration-300 shadow-xl hidden md:block">
                            {spotTitle}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>

              </motion.div>

              {/* Active Hotspot Bottom Popup drawer */}
              <AnimatePresence>
                {activeHotspot && (
                  <motion.div
                    key={activeHotspot.id}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="absolute bottom-4 left-2 right-2 sm:left-4 sm:right-4 md:left-6 md:right-auto md:w-80 bg-black/95 backdrop-blur-md border border-white/10 p-4 rounded-xl z-30 shadow-2xl"
                  >
                    <div className="flex justify-between items-start mb-1.5 font-sans">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">{t("kineticsChassisDetail")}</span>
                      <button 
                        onClick={() => setActiveHotspot(null)}
                        className="text-zinc-500 hover:text-zinc-200 text-xs font-mono"
                      >
                        {t("close")}
                      </button>
                    </div>
                    <h4 className="text-xs font-display font-black uppercase tracking-wider text-white flex items-center gap-1.5 mb-1.5 font-sans">
                      <span className={`w-1.5 h-1.5 rounded-full ${isOverdrive ? "bg-red-500" : "bg-neon-lime"}`} />
                      {lang === "en" ? (activeHotspot.titleEn || activeHotspot.title) : activeHotspot.title}
                    </h4>
                    <p className="text-[11px] text-zinc-350 font-sans tracking-tight leading-relaxed">
                      {lang === "en" ? (activeHotspot.descriptionEn || activeHotspot.description) : activeHotspot.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* LOWER CAP DATA SLIDER INFO */}
            <div className="bg-black/80 border border-white/10 rounded-xl p-3 md:p-4 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-950 flex items-center justify-center border border-white/10 flex-shrink-0">
                  <BrainCircuitIcon className={`w-4.5 h-4.5 ${isOverdrive ? "text-red-400 animate-pulse" : "text-neon-lime"}`} />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-zinc-500 block uppercase tracking-wider">{t("kineticsLabSeedUnit")}</span>
                  <span className="text-[11px] sm:text-xs text-zinc-300 font-sans">
                    {t("kineticsGuide")}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button 
                  onClick={() => {
                    const currentIndex = HOTSPOTS.findIndex(h => h.id === activeHotspot?.id);
                    const nextIndex = (currentIndex + 1) % HOTSPOTS.length;
                    setActiveHotspot(HOTSPOTS[nextIndex]);
                  }}
                  className="px-3 py-1.5 bg-black rounded-sm text-[10px] font-mono text-zinc-400 hover:bg-zinc-900 hover:text-neon-lime border border-white/10 transition cursor-pointer w-full sm:w-auto text-center"
                >
                  {t("nextNode")}
                </button>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* 04 // DETAIL CHASSIS MACRO ANALYSIS GRID */}
      <section id="macro-analysis" className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 border-t border-white/5 relative z-10 bg-black scroll-mt-36 md:scroll-mt-24">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 md:mb-12 gap-4">
          <div>
            <span className="font-mono text-[10px] text-neon-lime font-bold tracking-[0.3em] uppercase block mb-2">{t("kineticChassisAnalysis")}</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tighter uppercase">
              {t("macroAnalysisTitle")}<span className="stroke-text-white text-transparent font-black">{t("macroAnalysisTitleStroke")}</span>
            </h2>
          </div>
          <p className="font-mono text-[10px] text-zinc-500 max-w-sm text-left md:text-right">
            {t("microLog")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Mesh Weaver */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group border border-white/10 bg-zinc-950 p-4 rounded-none flex flex-col justify-between transition-all duration-350 hover:border-neon-lime/30"
          >
            <div className="aspect-square w-full overflow-hidden bg-black mb-4 relative border border-white/5">
              <img 
                src={DetailMeshImg} 
                alt="Mesh structure detailed shot" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-black/80 border border-white/10 text-white/70 font-mono text-[9px] px-2 py-0.5 tracking-widest uppercase">
                MESH_WEAVE
              </span>
            </div>
            <div>
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-1.5">
                <span>SYS_REF: A-900_MESH</span>
                <span className="text-neon-lime">ACT_98.2%</span>
              </div>
              <h3 className="font-display font-black text-lg text-white uppercase mb-2 tracking-tight group-hover:text-neon-lime transition-colors">
                {t("cardMeshTitle")}
              </h3>
              <p className="text-xs text-zinc-400 font-sans font-light leading-relaxed">
                {t("cardMeshDesc")}
              </p>
            </div>
          </motion.div>

          {/* Card 2: Carbon Sole Midplate */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group border border-white/10 bg-zinc-950 p-4 rounded-none flex flex-col justify-between transition-all duration-350 hover:border-neon-lime/30"
          >
            <div className="aspect-square w-full overflow-hidden bg-black mb-4 relative border border-white/5">
              <img 
                src={DetailSoleImg} 
                alt="Sole configuration detailed shot" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-black/80 border border-white/10 text-white/70 font-mono text-[9px] px-2 py-0.5 tracking-widest uppercase">
                CARBON_BLADE
              </span>
            </div>
            <div>
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-1.5">
                <span>SYS_REF: X-PLATE_v2</span>
                <span className="text-neon-lime">ENERGY_AMP</span>
              </div>
              <h3 className="font-display font-black text-lg text-white uppercase mb-2 tracking-tight group-hover:text-neon-lime transition-colors">
                {t("cardSoleTitle")}
              </h3>
              <p className="text-xs text-zinc-400 font-sans font-light leading-relaxed">
                {t("cardSoleDesc")}
              </p>
            </div>
          </motion.div>

          {/* Card 3: Heel Stabilizer Sensor */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group border border-white/10 bg-zinc-950 p-4 rounded-none flex flex-col justify-between transition-all duration-350 hover:border-neon-lime/30"
          >
            <div className="aspect-square w-full overflow-hidden bg-black mb-4 relative border border-white/5">
              <img 
                src={DetailHeelImg} 
                alt="Heel sensory component shot" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-black/80 border border-white/10 text-white/70 font-mono text-[9px] px-2 py-0.5 tracking-widest uppercase">
                STABILIZER_UNIT
              </span>
            </div>
            <div>
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-1.5">
                <span>SYS_REF: FIT_SENS_X</span>
                <span className="text-neon-lime">LASER_ENGRAV_ON</span>
              </div>
              <h3 className="font-display font-black text-lg text-white uppercase mb-2 tracking-tight group-hover:text-neon-lime transition-colors">
                {t("cardHeelTitle")}
              </h3>
              <p className="text-xs text-zinc-400 font-sans font-light leading-relaxed">
                {t("cardHeelDesc")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER SYSTEM FRAME INFO WITH ACCENT LOCALIZATIONS */}
      <footer className="border-t border-white/10 px-6 py-8 mt-6 md:mt-12 text-zinc-400 font-mono text-[9px] flex flex-col md:flex-row justify-between gap-4 max-w-7xl mx-auto z-20 relative bg-black">
        <div className="flex flex-col gap-1 items-start">
          <span className="text-[10px] font-bold tracking-[0.2em] text-neon-lime uppercase">{t("footerWeight")}</span>
          <span className="text-xl font-light text-zinc-200">198.4 <span className="text-xs font-mono text-zinc-500 uppercase">grams</span></span>
        </div>
        <div className="flex flex-col gap-1 items-start">
          <span className="text-[10px] font-bold tracking-[0.2em] text-neon-lime uppercase">{t("footerCushioning")}</span>
          <span className="text-xl font-light text-zinc-200">AETHER <span className="text-white font-semibold">MAX-CELL</span></span>
        </div>
        <div className="flex flex-col gap-1 items-start">
          <span className="text-[10px] font-bold tracking-[0.2em] text-neon-lime uppercase">{t("footerPlate")}</span>
          <span className="text-xl font-light text-zinc-200">SPEED <span className="text-white font-semibold">PLATE v2</span></span>
        </div>
        <div className="flex flex-col gap-1 items-stretch md:items-end justify-center">
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-neon-lime animate-pulse"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">{t("footerInventory")}</span>
          </div>
          <span className="text-[8px] text-zinc-650 tracking-wider font-mono">{t("footerProtocol")}</span>
        </div>
      </footer>


      {/* MODAL 1: PRECISE ENGINEERING SPECIFICATIONS */}
      <AnimatePresence>
        {showSpecsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSpecsModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
            />

            {/* Content Card */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-black border border-white/10 w-full max-w-xl rounded-none overflow-hidden relative z-10 shadow-[0_0_50px_rgba(215,255,0,0.05)] font-sans max-h-[85vh] flex flex-col"
            >
              <div className="border-b border-white/10 p-5 flex items-center justify-between flex-shrink-0">
                <div>
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">{t("specModalArchiveCode")}</span>
                  <h3 className="font-display font-black text-lg text-white tracking-wide">{t("specModalTitle")}</h3>
                </div>
                <button 
                  onClick={() => setShowSpecsModal(false)}
                  className="w-8 h-8 rounded-none border border-white/10 hover:bg-zinc-900 hover:border-white/30 transition flex items-center justify-center font-mono text-zinc-400 cursor-pointer text-sm"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-5 overflow-y-auto flex-1">
                {SNEAKER_SPECS.map((spec, idx) => {
                  const specLabel = lang === "en" ? (spec.labelEn || spec.label) : spec.label;
                  const specValue = lang === "en" ? (spec.valueEn || spec.value) : spec.value;
                  const specDetail = lang === "en" ? (spec.detailEn || spec.detail) : spec.detail;
                  return (
                    <div key={idx} className="grid grid-cols-3 gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <div className="col-span-1">
                        <span className="font-mono text-[9px] text-zinc-500 block uppercase tracking-wider">MODULE_S{idx + 1}</span>
                        <span className="font-mono font-bold text-xs text-zinc-200 uppercase tracking-wider">{specLabel}</span>
                      </div>
                      <div className="col-span-2 space-y-1">
                        <span className="text-xs font-mono font-bold text-neon-lime block tracking-wider">{specValue}</span>
                        <p className="text-[11px] text-zinc-350 leading-normal font-sans font-light">{specDetail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-zinc-950/40 border-t border-white/10 flex justify-end flex-shrink-0">
                <button
                  onClick={() => setShowSpecsModal(false)}
                  className="px-5 py-2.5 bg-neon-lime text-black font-mono text-xs font-black tracking-widest rounded-none hover:bg-white hover:text-black transition cursor-pointer"
                >
                  {t("specModalSysClose")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* MODAL 2: INTERACTIVE PRE-ORDER SYSTEM CHECKSUM */}
      <AnimatePresence>
        {showOrderModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOrderModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
            />

            {/* Content Card */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-black border border-white/10 w-full max-w-md rounded-none overflow-hidden relative z-10 shadow-[0_0_50px_rgba(215,255,0,0.05)] font-sans max-h-[85vh] flex flex-col"
            >
              {!orderCompleted ? (
                <form onSubmit={handleCompleteOrder} className="flex-1 flex flex-col overflow-hidden max-h-full">
                  <div className="p-5 border-b border-white/10 flex justify-between items-center bg-zinc-950/60 font-sans flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4.5 h-4.5 text-neon-lime" />
                      <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">{t("orderModalMountProtocol")}</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setShowOrderModal(false)}
                      className="text-zinc-500 hover:text-zinc-200 text-xs font-mono"
                    >
                      {t("orderModalAbort")}
                    </button>
                  </div>

                  <div className="p-6 space-y-4 overflow-y-auto flex-1">
                    <div className="bg-zinc-950/80 p-4 rounded-none border border-white/10 space-y-2.5 font-mono text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">{t("orderModalSysId")}</span>
                        <span className="text-zinc-300 font-bold">X-900 SPEEDBLADE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">{t("orderModalCoreColor")}</span>
                        <span className="font-bold text-neon-lime">{activeColorwayName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">{t("orderModalDiagSize")}</span>
                        <span className="text-white font-bold">{selectedSize} mm</span>
                      </div>
                      {engravingText ? (
                        <div className="flex justify-between">
                          <span className="text-zinc-500">{t("orderModalHeelEngrave")}</span>
                          <span className="text-neon-lime font-bold">&#34;{engravingText}&#34;</span>
                        </div>
                      ) : (
                        <div className="flex justify-between">
                          <span className="text-zinc-500">{t("orderModalHeelEngrave")}</span>
                          <span className="text-zinc-650">{t("orderModalNone")}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-t border-white/10 pt-2 text-xs font-bold font-mono">
                        <span className="text-zinc-400">{t("orderModalEstPrice")}</span>
                        <span className="text-white font-black">{lang === "en" ? "$ 219.00 USD" : "₩ 289,000"}</span>
                      </div>
                    </div>

                    <div className="space-y-3 font-mono">
                      <div>
                        <label className="block text-[9px] text-zinc-500 mb-1 uppercase tracking-wider">{t("orderModalReceiverLabel")}</label>
                        <input
                          type="text"
                          required
                          placeholder={t("orderModalReceiverPlaceholder")}
                          className="w-full bg-black border border-white/10 py-2 px-3 text-xs text-white rounded-none focus:outline-none focus:border-neon-lime transition-all placeholder:text-zinc-650 font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] text-zinc-500 mb-1 uppercase tracking-wider">{t("orderModalContactLabel")}</label>
                        <input
                          type="tel"
                          required
                          placeholder={t("orderModalContactPlaceholder")}
                          className="w-full bg-black border border-white/10 py-2 px-3 text-xs text-white rounded-none focus:outline-none focus:border-neon-lime transition-all placeholder:text-zinc-650 font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] text-zinc-500 mb-1 uppercase tracking-wider">{t("orderModalShippingLabel")}</label>
                        <input
                          type="text"
                          required
                          placeholder={t("orderModalShippingPlaceholder")}
                          className="w-full bg-black border border-white/10 py-2 px-3 text-xs text-white rounded-none focus:outline-none focus:border-neon-lime transition-all placeholder:text-zinc-650 font-sans"
                        />
                      </div>
                    </div>

                    <p className="text-[10px] text-zinc-500 font-mono text-center">
                      {t("orderModalDisclaimer")}
                    </p>
                  </div>

                  <div className="p-4 bg-zinc-950/60 border-t border-white/10 flex gap-3 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowOrderModal(false)}
                      className="flex-1 py-2 rounded-none text-zinc-400 bg-black border border-white/10 text-xs font-mono font-bold hover:bg-neutral-900 hover:text-white cursor-pointer"
                    >
                      {t("orderModalAbortBtn")}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 rounded-none text-xs font-mono font-black tracking-widest bg-neon-lime text-black hover:bg-white hover:text-black cursor-pointer transition-all"
                    >
                      {t("orderModalConfirmBtn")}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-6 text-center space-y-5 overflow-y-auto flex-1">
                  <div className="w-12 h-12 rounded-none bg-black border border-neon-lime/30 flex items-center justify-center mx-auto text-neon-lime shadow-[0_0_15px_rgba(212,255,0,0.1)]">
                    <CheckCircle className="w-6 h-6 animate-pulse" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-display font-black tracking-wider text-white uppercase text-lg">{t("orderSuccessTitle")}</h4>
                    <p className="text-xs text-zinc-400 leading-normal px-2 font-sans font-light">
                      {t("orderSuccessDesc")}
                    </p>
                  </div>

                  <div className="bg-zinc-950 p-4 rounded-none border border-white/10 text-left font-mono text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-zinc-650 uppercase">{t("orderSuccessSerial")}</span>
                      <span className="text-neon-lime font-bold">{orderSerial}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-650 uppercase">{t("orderSuccessLine")}</span>
                      <span className="text-zinc-300">{t("orderSuccessLineVal")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-650 uppercase">{t("orderSuccessQueue")}</span>
                      <span className="text-cyan-400">{t("orderSuccessQueueVal")}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowOrderModal(false);
                      setOrderCompleted(false);
                    }}
                    className="w-full py-2.5 bg-neon-lime text-black text-xs font-mono font-black tracking-widest rounded-none hover:bg-white cursor-pointer transition-all"
                  >
                    {t("orderSuccessReturnBtn")}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Simple React components declared inline inside App.tsx or derived safely.
function BrainCircuitIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2050/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v8h6.5" />
      <path d="M18.5 10a2.5 2.5 0 0 1 0 5H18" />
      <path d="M12 10H5.5" />
      <path d="M5.5 10a2.5 2.5 0 0 0 0 5H6" />
      <path d="M12 22V14" />
      <path d="M12 6H5" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
