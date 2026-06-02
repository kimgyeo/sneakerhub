/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Colorway, SneakerSpec, InteractiveHotspot } from "./types";

export const COLORWAYS: Colorway[] = [
  {
    id: "aether_neon",
    name: "AETHER NEON",
    nameEn: "AETHER NEON",
    hueClass: "hue-rotate-[245deg] saturate-[1.5] brightness-[1.1]",
    accentClass: "text-neon-lime border-neon-lime/40 bg-neon-lime/10",
    glowClass: "shadow-[0_0_35px_rgba(212,255,0,0.25)]",
    bgGlowClass: "from-neon-lime/15 via-transparent to-transparent",
    bgButtonClass: "bg-neon-lime text-black hover:bg-white hover:text-black shadow-lg shadow-neon-lime/30",
    textColor: "text-neon-lime",
    description: "독보적인 감각의 미래지향적 테크웨어 시그니처 룩. 하이퍼 애더 네온라임 악센트.",
    descriptionEn: "Unrivaled futuristic techwear signature aesthetic. Marked by hyper aether neon-lime accents."
  },
  {
    id: "cyan_shock",
    name: "CYAN SHOCK",
    nameEn: "CYAN SHOCK",
    hueClass: "hue-rotate-0",
    accentClass: "text-cyan-400 border-cyan-400/40 bg-cyan-950/20",
    glowClass: "shadow-[0_0_30px_rgba(34,211,238,0.2)]",
    bgGlowClass: "from-cyan-500/15 via-transparent to-transparent",
    bgButtonClass: "bg-cyan-500 text-zinc-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/30",
    textColor: "text-cyan-400",
    description: "도시의 심야 차가운 네온 조명과 어둠을 형상화한 하이퍼 실버 & 사이언 블루 조합.",
    descriptionEn: "A chilling combination of hyper silver and cyan blue representing city midnight neon and deep shadows."
  },
  {
    id: "magma_burst",
    name: "MAGMA BURST",
    nameEn: "MAGMA BURST",
    hueClass: "hue-rotate-[130deg] saturate-[1.4] brightness-[1.05]",
    accentClass: "text-orange-500 border-orange-500/40 bg-orange-950/20",
    glowClass: "shadow-[0_0_30px_rgba(249,115,22,0.2)]",
    bgGlowClass: "from-orange-500/15 via-transparent to-transparent",
    bgButtonClass: "bg-orange-500 text-white hover:bg-orange-400 shadow-lg shadow-orange-500/30",
    textColor: "text-orange-500",
    description: "발끝에서부터 심장을 자극하여 솟구치는 열기를 형상화한 익스트림 마그마 레빛 조합.",
    descriptionEn: "An extreme magma-flare blend embodying the rising heat that signals ultimate speed starting from your soles."
  },
  {
    id: "stealth_chrome",
    name: "STEALTH VELOCITY",
    nameEn: "STEALTH VELOCITY",
    hueClass: "grayscale brightness-[0.7] contrast-[1.4]",
    accentClass: "text-zinc-300 border-zinc-700/40 bg-zinc-900/40",
    glowClass: "shadow-[0_0_30px_rgba(255,255,255,0.05)]",
    bgGlowClass: "from-zinc-500/10 via-transparent to-transparent",
    bgButtonClass: "bg-zinc-200 text-zinc-950 hover:bg-white shadow-lg shadow-white/10",
    textColor: "text-white/80",
    description: "한 치의 타협도 없는 무채색 카본 파이버와 매트 메탈릭 블랙이 빚어낸 극강의 하이테크 스텔스 조합.",
    descriptionEn: "An absolute high-tech stealth compilation of uncompromising neutral carbon fibre and matte metallic black."
  }
];

export const SNEAKER_SPECS: SneakerSpec[] = [
  {
    label: "CHASSIS WEIGHT",
    labelEn: "CHASSIS WEIGHT",
    value: "204 g",
    valueEn: "204 g",
    detail: "스피드 보존 한계치인 210g의 장벽을 허물어 극적인 경량감을 선사합니다.",
    detailEn: "Smashes through the 210g speed-retention barrier, delivering a dramatic sensation of ultra-weightlessness."
  },
  {
    label: "MIDSOLE SYSTEMS",
    labelEn: "MIDSOLE SYSTEMS",
    value: "PNEUMATIC CUSHION",
    valueEn: "PNEUMATIC CUSHION",
    detail: "개별 러너의 압력 패턴을 측정하여 실시간 최적의 수축반응을 유도하는 공기 주입 코어.",
    detailEn: "A real-time pressure-responsive cell system delivering optimal contraction feedback based on personal footstrikes."
  },
  {
    label: "PROPULSION CHIPS",
    labelEn: "PROPULSION CHIPS",
    value: "CARBON WAVEPLATE XL",
    valueEn: "CARBON WAVEPLATE XL",
    detail: "착지 시 흡수한 에너지를 지반을 박차고 나가는 도약 반발 마력으로 변전합니다.",
    detailEn: "Converts shock forces absorbed during landing into sheer launch-propulsion horsepower to carry you forward."
  },
  {
    label: "UPPER TECH",
    labelEn: "UPPER TECH",
    value: "INTELLI-KNIT MESH",
    valueEn: "INTELLI-KNIT MESH",
    detail: "수축과 지탱의 섬세한 그물망 오토핏 편조로 양말 크기의 밀착도와 통풍성을 제공합니다.",
    detailEn: "Crafted with dynamic compression and tension knitting zones, providing a sock-like fit and maximum ventilation."
  }
];

export const HOTSPOTS: InteractiveHotspot[] = [
  {
    id: "duct",
    x: 22,
    y: 38,
    title: "Aero-Duct Channel",
    titleEn: "Aero-Duct Channel",
    description: "고속 주행 상태에서 내부 유압과 열기를 부양력으로 순환 전환하는 초극의 방출구 구조.",
    descriptionEn: "Highly engineered release ducts transforming internal chassis heat and humidity into auxiliary aerodynamic lift."
  },
  {
    id: "knitting",
    x: 52,
    y: 18,
    title: "Intelli-Weave Fit",
    titleEn: "Intelli-Weave Fit",
    description: "인체 공학적 굴곡 부위마다 가볍고 부드럽게 이중 편조된 초탄성 하이퍼 메쉬 코팅.",
    descriptionEn: "Dual-knit hyper-elastic support pattern adapting selectively to the foot's flex points for uniform grip."
  },
  {
    id: "plate",
    x: 78,
    y: 62,
    title: "Carbon Propulsion Pro",
    titleEn: "Carbon Propulsion Pro",
    description: "이중 경도의 굴절 궤적 복합 탄소 섬유를 내장하여 발 디딤 순간 최대 15% 탄력을 가습합니다.",
    descriptionEn: "Embedded dual-density variable curvature composite carbon fiber blade boosting stride return by up to 15%."
  },
  {
    id: "shock",
    x: 35,
    y: 84,
    title: "Pneumatic Active Core",
    titleEn: "Pneumatic Active Core",
    description: "지면 충격을 균일하게 소모 해소하는 일체화 서스펜션 패키지로 무릎 충격을 완충합니다.",
    descriptionEn: "Integrated adaptive suspension unit evenly dissolving pavement strikes, reducing load on ankles and knees."
  }
];
