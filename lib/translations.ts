import type { Locale } from "./i18n"

type Translations = {
  home: {
    title: string
    description: string
    content: string
    mobileOnly: string
    button: string
    qrTitle: string
    qrDescription: string
    tokenSubtitle: string
    potentialTitle: string
    potentialDesc: string
    launchConditionTitle: string
    launchConditionDesc: string
    earlyAccessTitle: string
    earlyAccessDesc: string
    tradeButton: string
  }
  verify: {
    title: string
    subtitle: string
    mobileOnlyTitle: string
    mobileOnlyDesc: string
    mobileOnlyInstructions: string
    miniKitNotDetected: string
    miniKitNotDetectedDesc: string
    settingsTitle: string
    settingsDescription: string
    actionLabel: string
    actionPlaceholder: string
    actionHelp: string
    signalLabel: string
    signalPlaceholder: string
    signalHelp: string
    verificationLevel: string
    verificationLevelDesc: string
    verifyButton: string
    verifying: string
    successTitle: string
    failedTitle: string
    successMessage: string
    detailsTitle: string
    detailsDescription: string
    nullifierHash: string
    merkleRoot: string
    viewProof: string
    aboutTitle: string
    aboutContent1: string
    aboutContent2: string
  }
  wallet: {
    title: string
    description: string
    connectButton: string
    connected: string
    address: string
    disconnect: string
    worldAppRequired: string
  }
  footer: {
    builtWith: string
    support: string
  }
  swap: {
    title: string
    description: string
    liveTradingTitle: string
    liveTradingDesc: string
    instantSwapsTitle: string
    instantSwapsDesc: string
    secureTradingTitle: string
    secureTradingDesc: string
    swapTokens: string
    from: string
    to: string
    rate: string
    tradeOnPUF: string
    tradingInfo: string
    availablePairs: string
    priceInfo: string
    currentRate: string
    volume24h: string
    liquidity: string
    tradeOnPUFTitle: string
    tradeOnPUFDesc: string
    backToHome: string
    active: string
  }
  claim: {
    title: string
    description: string
    freeNFTTitle: string
    freeNFTDesc: string
    freeMintingTitle: string
    freeMintingDesc: string
    onePerWalletTitle: string
    onePerWalletDesc: string
    earlyAccessTitle: string
    earlyAccessDesc: string
    claimNFT: string
    connectWallet: string
    verifyIdentity: string
    claimFree: string
    estimatedTime: string
    agreeTerms: string
    collectionInfo: string
    collectionDetails: string
    totalSupply: string
    freeClaims: string
    remaining: string
    nftBenefits: string
    earlyAccess: string
    priorityDrops: string
    communityAccess: string
    joinDiscord: string
    futureRewards: string
    earnTokens: string
    viewCollection: string
    viewCollectionDesc: string
    tradeTokens: string
    backToHome: string
    limitedTime: string
  }
  banner: {
    title: string
    description: string
    tradeNow: string
    target: string
    potential: string
    currentPrice: string
  }
  tip: {
    title: string
    description: string
    sendTip: string
    sendTipDescription: string
    recipientAddress: string
    amount: string
    selectToken: string
    send: string
    sending: string
    successMessage: string
    viewTransaction: string
    connectWalletError: string
    invalidAmountError: string
    transactionFailed: string
  }
  notifications: {
    title: string
    subtitle: string
    enableTitle: string
    enableDescription: string
    enabled: string
    enabledDescription: string
    denied: string
    deniedDescription: string
    checkAgain: string
    requesting: string
    enable: string
    benefit1: string
    benefit2: string
    benefit3: string
    typesTitle: string
    type1: string
    type1Description: string
    type2: string
    type2Description: string
    type3: string
    type3Description: string
    type4: string
    type4Description: string
    guidelinesTitle: string
    guidelinesDescription: string
  }
}

const translations: Record<Locale, Translations> = {
  en: {
    home: {
      title: "GHOSTART Verification",
      description: "Verify unique humans with World ID incognito actions",
      content:
        "This application demonstrates how to use World ID's MiniKit to verify unique humans through incognito actions, ensuring bot-free experiences.",
      mobileOnly:
        "This app only works in World App on mobile. Please open it in World App to use verification features.",
      button: "Go to Verification Page",
      qrTitle: "Test Your Mini App",
      qrDescription: "Scan the QR code with your phone's camera to open this app in World App.",
      tokenSubtitle: "Early Trading on PUF Mini App - Join Before Launch",
      potentialTitle: "Massive Growth Potential",
      potentialDesc: "Early investors could see 100x-1000x returns when $GHOSTART launches on the marketplace.",
      launchConditionTitle: "Auto-Launch at 2000 WLD",
      launchConditionDesc: "Token will automatically launch when marketplace reaches 2000 WLD trading volume.",
      earlyAccessTitle: "Early Trading Available Now",
      earlyAccessDesc: "Get in early on PUF before the official launch and maximize your potential returns.",
      tradeButton: "Trade $GHOSTART on PUF",
    },
    verify: {
      title: "World ID Verification",
      subtitle: "Verify unique humans with World ID incognito actions",
      mobileOnlyTitle: "Mobile App Required",
      mobileOnlyDesc: "This verification feature only works in World App on mobile devices.",
      mobileOnlyInstructions: "To use this app, please open it in World App on your mobile device.",
      miniKitNotDetected: "MiniKit Not Detected",
      miniKitNotDetectedDesc: "Please open this page in World App to use verification features.",
      settingsTitle: "Verification Settings",
      settingsDescription: "Configure your incognito action verification",
      actionLabel: "Action ID",
      actionPlaceholder: "voting-action",
      actionHelp: "The action ID from your Developer Portal",
      signalLabel: "Signal (Optional)",
      signalPlaceholder: "0x12312",
      signalHelp: "Optional additional data to include in the verification",
      verificationLevel: "Verification Level",
      verificationLevelDesc: "Currently set to Orb verification level",
      verifyButton: "Verify with World ID",
      verifying: "Verifying...",
      successTitle: "Verification Successful",
      failedTitle: "Verification Failed",
      successMessage: "The user has been verified as a unique human.",
      detailsTitle: "Verification Details",
      detailsDescription: "Proof information from World ID",
      nullifierHash: "Nullifier Hash",
      merkleRoot: "Merkle Root",
      viewProof: "View Proof Data",
      aboutTitle: "About World ID Verification",
      aboutContent1:
        "World ID incognito actions allow you to verify unique humans without revealing their identity. This is perfect for creating bot-free experiences in games, voting systems, and more.",
      aboutContent2:
        "The verification process uses zero-knowledge proofs to confirm a user is a unique human while maintaining their privacy.",
    },
    wallet: {
      title: "Connect Wallet",
      description: "Connect your World App wallet to verify your identity and access $GHOSTART trading.",
      connectButton: "Connect World App Wallet",
      connected: "Wallet Connected",
      address: "Address",
      disconnect: "Disconnect",
      worldAppRequired: "World App wallet required for KYC verification",
    },
    footer: {
      builtWith: "Built with World ID MiniKit",
      support: "Support",
    },
    swap: {
      title: "Token Swap",
      description: "Swap between WLD and $GHOSTART tokens",
      liveTradingTitle: "Live Trading Available",
      liveTradingDesc: "Trade $GHOSTART tokens on the PUF marketplace with real-time pricing and liquidity.",
      instantSwapsTitle: "Instant Swaps",
      instantSwapsDesc: "Swap tokens instantly with competitive rates",
      secureTradingTitle: "Secure Trading",
      secureTradingDesc: "All swaps are secured by smart contracts",
      swapTokens: "Swap Tokens",
      from: "From",
      to: "To",
      rate: "Rate: 1 GHOSTART = $0.000009 USDT",
      tradeOnPUF: "Trade on PUF Marketplace",
      tradingInfo: "Trading Information",
      availablePairs: "Available Pairs",
      priceInfo: "Price Information",
      currentRate: "Current Rate",
      volume24h: "24h Volume",
      liquidity: "Liquidity",
      tradeOnPUFTitle: "Trade on PUF",
      tradeOnPUFDesc: "For the best trading experience and real-time prices, use the PUF marketplace directly.",
      backToHome: "Back to Home",
      active: "Active",
    },
    claim: {
      title: "Free NFT Claim",
      description: "Claim your free GHOSTART NFT - No cost required!",
      freeNFTTitle: "Free NFT Available",
      freeNFTDesc: "Claim your exclusive GHOSTART NFT completely free! Limited to 1 NFT per wallet.",
      freeMintingTitle: "100% Free Minting",
      freeMintingDesc: "No gas fees, no payment required",
      onePerWalletTitle: "One Per Wallet",
      onePerWalletDesc: "Limited to prevent spam and ensure fairness",
      earlyAccessTitle: "Early Access Benefits",
      earlyAccessDesc: "Get priority access to future drops and features",
      claimNFT: "Claim Your Free NFT",
      connectWallet: "Connect your World App wallet",
      verifyIdentity: "Verify your identity (one-time)",
      claimFree: "Claim your free NFT",
      estimatedTime: "Estimated time: 30 seconds",
      agreeTerms: "By claiming, you agree to our terms and conditions",
      collectionInfo: "NFT Collection Info",
      collectionDetails: "Collection Details",
      totalSupply: "Total Supply",
      freeClaims: "Free Claims",
      remaining: "Remaining",
      nftBenefits: "NFT Benefits",
      earlyAccess: "Early Access",
      priorityDrops: "Priority for future drops",
      communityAccess: "Community Access",
      joinDiscord: "Join exclusive Discord",
      futureRewards: "Future Rewards",
      earnTokens: "Earn $GHOSTART tokens",
      viewCollection: "View Collection",
      viewCollectionDesc: "Check out the full GHOSTART NFT collection and see what other NFTs are available.",
      tradeTokens: "Trade Tokens",
      backToHome: "Back to Home",
      limitedTime: "Limited Time",
    },
    banner: {
      title: "Trade GHOSTART on PUF",
      description: "Help reach 2000 WLD target to launch on all trading platforms!",
      tradeNow: "Trade Now",
      target: "2000 WLD Target",
      potential: "Potential 100x-1000x returns from current price!",
      currentPrice: "Current: $0.000009 USDT",
    },
    tip: {
      title: "Send a Tip",
      description: "Support the GHOSTART NFT marketplace by sending a tip",
      sendTip: "Send Tip",
      sendTipDescription: "Send WLD or GHOSTART tokens as a tip to support the marketplace",
      recipientAddress: "Recipient Address",
      amount: "Amount",
      selectToken: "Select Token",
      send: "Send Tip",
      sending: "Sending...",
      successMessage: "Tip sent successfully!",
      viewTransaction: "View Transaction",
      connectWalletError: "Please connect your wallet first",
      invalidAmountError: "Please enter a valid amount",
      transactionFailed: "Transaction failed. Please try again.",
    },
    notifications: {
      title: "Notifications",
      subtitle: "Stay updated with your NFT activities and marketplace events",
      enableTitle: "Enable Notifications",
      enableDescription: "Get notified about your NFT activities, sales, and marketplace updates",
      enabled: "Notifications Enabled",
      enabledDescription: "You'll receive notifications about your NFT activities",
      denied: "Notifications Disabled",
      deniedDescription: "You can enable notifications in your device settings",
      checkAgain: "Check Again",
      requesting: "Requesting...",
      enable: "Enable Notifications",
      benefit1: "Get notified when your NFTs are minted",
      benefit2: "Receive alerts for sales and marketplace activity",
      benefit3: "Stay updated with free NFT claims and rewards",
      typesTitle: "Notification Types",
      type1: "NFT Minted",
      type1Description: "When your NFT is successfully minted",
      type2: "Free NFT Claimed",
      type2Description: "When you claim your free NFT",
      type3: "NFT Listed",
      type3Description: "When your NFT is listed for sale",
      type4: "NFT Sold",
      type4Description: "When your NFT is sold",
      guidelinesTitle: "Notification Guidelines",
      guidelinesDescription: "We follow World App guidelines: notifications are functional, relevant, and directly related to your NFT activities.",
    },
  },
  es: {
    home: {
      title: "Verificación GHOSTART",
      description: "Verifica humanos únicos con acciones incógnito de World ID",
      content:
        "Esta aplicación demuestra cómo usar MiniKit de World ID para verificar humanos únicos a través de acciones incógnito, garantizando experiencias libres de bots.",
      mobileOnly:
        "Esta aplicación solo funciona en World App en móvil. Por favor ábrela en World App para usar las funciones de verificación.",
      button: "Ir a la Página de Verificación",
      qrTitle: "Prueba Tu Mini App",
      qrDescription: "Escanea el código QR con la cámara de tu teléfono para abrir esta aplicación en World App.",
      tokenSubtitle: "Trading Temprano en PUF Mini App - Únete Antes del Lanzamiento",
      potentialTitle: "Potencial de Crecimiento Masivo",
      potentialDesc:
        "Los inversores tempranos podrían ver retornos de 100x-1000x cuando $GHOSTART se lance en el mercado.",
      launchConditionTitle: "Auto-Lanzamiento a 2000 WLD",
      launchConditionDesc:
        "El token se lanzará automáticamente cuando el mercado alcance 2000 WLD de volumen de trading.",
      earlyAccessTitle: "Trading Temprano Disponible Ahora",
      earlyAccessDesc: "Entra temprano en PUF antes del lanzamiento oficial y maximiza tus retornos potenciales.",
      tradeButton: "Comerciar $GHOSTART en PUF",
    },
    verify: {
      title: "Verificación World ID",
      subtitle: "Verifica humanos únicos con acciones incógnito de World ID",
      mobileOnlyTitle: "Aplicación Móvil Requerida",
      mobileOnlyDesc: "Esta función de verificación solo funciona en World App en dispositivos móviles.",
      mobileOnlyInstructions: "Para usar esta aplicación, por favor ábrela en World App en tu dispositivo móvil.",
      miniKitNotDetected: "MiniKit No Detectado",
      miniKitNotDetectedDesc: "Por favor abre esta página en World App para usar los recursos de verificación.",
      settingsTitle: "Configuración de Verificación",
      settingsDescription: "Configura tu verificación de acción incógnita",
      actionLabel: "ID de Acción",
      actionPlaceholder: "accion-votacion",
      actionHelp: "El ID de acción de tu Portal de Desarrollador",
      signalLabel: "Señal (Opcional)",
      signalPlaceholder: "0x12312",
      signalHelp: "Datos adicionales opcionales para incluir en la verificación",
      verificationLevel: "Nivel de Verificación",
      verificationLevelDesc: "Actualmente configurado en nivel de verificación Orb",
      verifyButton: "Verificar con World ID",
      verifying: "Verificando...",
      successTitle: "Verificación Exitosa",
      failedTitle: "Verificación Fallida",
      successMessage: "El usuario ha sido verificado como un humano único.",
      detailsTitle: "Detalles de Verificación",
      detailsDescription: "Información de prueba de World ID",
      nullifierHash: "Nullifier Hash",
      merkleRoot: "Merkle Root",
      viewProof: "Ver Datos de Prueba",
      aboutTitle: "Acerca de la Verificación World ID",
      aboutContent1:
        "Las acciones incógnito de World ID te permiten verificar humanos únicos sin revelar su identidad. Esto es perfecto para crear experiencias libres de bots en juegos, sistemas de votación y mucho más.",
      aboutContent2:
        "El proceso de verificación utiliza pruebas de conocimiento cero para confirmar que un usuario es un humano único mientras mantiene su privacidad.",
    },
    wallet: {
      title: "Conectar Billetera",
      description: "Conecta tu billetera de World App para verificar tu identidad y acceder al trading de $GHOSTART.",
      connectButton: "Conectar Billetera de World App",
      connected: "Billetera Conectada",
      address: "Dirección",
      disconnect: "Desconectar",
      worldAppRequired: "Se requiere billetera de World App para verificación KYC",
    },
    footer: {
      builtWith: "Construido con World ID MiniKit",
      support: "Soporte",
    },
    banner: {
      title: "Negociar GHOSTART en PUF",
      description: "¡Ayuda a alcanzar el objetivo de 2000 WLD para lanzar en todas las plataformas de trading!",
      tradeNow: "Negociar Ahora",
      target: "Objetivo 2000 WLD",
      potential: "¡Potencial de retornos 100x-1000x desde el precio actual!",
      currentPrice: "Actual: $0.000009 USDT",
    },
    tip: {
      title: "Enviar Propina",
      description: "Apoya el mercado de NFTs GHOSTART enviando una propina",
      sendTip: "Enviar Propina",
      sendTipDescription: "Envía tokens WLD o GHOSTART como propina para apoyar el mercado",
      recipientAddress: "Dirección del Destinatario",
      amount: "Cantidad",
      selectToken: "Seleccionar Token",
      send: "Enviar Propina",
      sending: "Enviando...",
      successMessage: "¡Propina enviada exitosamente!",
      viewTransaction: "Ver Transacción",
      connectWalletError: "Por favor conecta tu billetera primero",
      invalidAmountError: "Por favor ingresa una cantidad válida",
      transactionFailed: "La transacción falló. Por favor intenta de nuevo.",
    },
    notifications: {
      title: "Notificaciones",
      subtitle: "Mantente actualizado con tus actividades de NFT y eventos del mercado",
      enableTitle: "Habilitar Notificaciones",
      enableDescription: "Recibe notificaciones sobre tus actividades de NFT, ventas y actualizaciones del mercado",
      enabled: "Notificaciones Habilitadas",
      enabledDescription: "Recibirás notificaciones sobre tus actividades de NFT",
      denied: "Notificaciones Deshabilitadas",
      deniedDescription: "Puedes habilitar notificaciones en la configuración de tu dispositivo",
      checkAgain: "Verificar de Nuevo",
      requesting: "Solicitando...",
      enable: "Habilitar Notificaciones",
      benefit1: "Recibe notificaciones cuando tus NFTs sean acuñados",
      benefit2: "Recibe alertas para ventas y actividad del mercado",
      benefit3: "Mantente actualizado con reclamaciones de NFT gratis y recompensas",
      typesTitle: "Tipos de Notificaciones",
      type1: "NFT Acuñado",
      type1Description: "Cuando tu NFT sea acuñado exitosamente",
      type2: "NFT Gratis Reclamado",
      type2Description: "Cuando reclames tu NFT gratis",
      type3: "NFT Listado",
      type3Description: "Cuando tu NFT sea listado para venta",
      type4: "NFT Vendido",
      type4Description: "Cuando tu NFT sea vendido",
      guidelinesTitle: "Pautas de Notificaciones",
      guidelinesDescription: "Seguimos las pautas de World App: las notificaciones son funcionales, relevantes y directamente relacionadas con tus actividades de NFT.",
    },
  },
  th: {
    home: {
      title: "การยืนยันตัวตน GHOSTART",
      description: "ยืนยันมนุษย์ที่ไม่ซ้ำกันด้วยการดำเนินการแบบไม่เปิดเผยตัวตนของ World ID",
      content:
        "แอปพลิเคชันนี้แสดงวิธีการใช้ MiniKit ของ World ID เพื่อยืนยันมนุษย์ที่ไม่ซ้ำกันผ่านการดำเนินการแบบไม่เปิดเผยตัวตน เพื่อให้มั่นใจว่าไม่มีบอท",
      mobileOnly: "แอปนี้ใช้งานได้เฉพาะใน World App บนมือถือเท่านั้น โปรดเปิดใน World App เพื่อใช้ฟีเจอร์การยืนยันตัวตน",
      button: "ไปที่หน้ายืนยันตัวตน",
      qrTitle: "ทดสอบมินิแอปของคุณ",
      qrDescription: "สแกน QR code ด้วยกล้องโทรศัพท์ของคุณเพื่อเปิดแอปนี้ใน World App",
      tokenSubtitle: "การซื้อขายก่อนเปิดตัวบน PUF Mini App - เข้าร่วมก่อนเปิดตัว",
      potentialTitle: "ศักยภาพการเติบโตสูงมาก",
      potentialDesc: "นักลงทุนรายแรกอาจได้รับผลตอบแทน 100-1000 เท่าเมื่อ $GHOSTART เปิดตัวในตลาด",
      launchConditionTitle: "เปิดตัวอัตโนมัติที่ 2000 WLD",
      launchConditionDesc: "โทเค็นจะเปิดตัวอัตโนมัติเมื่อตลาดมีปริมาณการซื้อขาย 2000 WLD",
      earlyAccessTitle: "การซื้อขายก่อนเปิดตัวพร้อมแล้ว",
      earlyAccessDesc: "เข้าร่วมก่อนบน PUF ก่อนการเปิดตัวอย่างเป็นทางการและเพิ่มผลตอบแทนสูงสุด",
      tradeButton: "ซื้อขาย $GHOSTART บน PUF",
    },
    verify: {
      title: "การยืนยันตัวตน World ID",
      subtitle: "ยืนยันมนุษย์ที่ไม่ซ้ำกันด้วยการดำเนินการแบบไม่เปิดเผยตัวตนของ World ID",
      mobileOnlyTitle: "ต้องใช้แอปมือถือ",
      mobileOnlyDesc: "ฟีเจอร์การยืนยันตัวตนนี้ใช้งานได้เฉพาะใน World App บนอุปกรณ์มือถือเท่านั้น",
      mobileOnlyInstructions: "หากต้องการใช้แอปนี้ โปรดเปิดใน World App บนอุปกรณ์มือถือของคุณ",
      miniKitNotDetected: "ไม่พบ MiniKit",
      miniKitNotDetectedDesc: "โปรดเปิดหน้านี้ใน World App เพื่อใช้ฟีเจอร์การยืนยันตัวตน",
      settingsTitle: "การตั้งค่าการยืนยันตัวตน",
      settingsDescription: "กำหนดค่าการยืนยันตัวตนแบบไม่เปิดเผยตัวตนของคุณ",
      actionLabel: "ID การดำเนินการ",
      actionPlaceholder: "การลงคะแนน",
      actionHelp: "ID การดำเนินการจาก Developer Portal ของคุณ",
      signalLabel: "สัญญาณ (ไม่บังคับ)",
      signalPlaceholder: "0x12312",
      signalHelp: "ข้อมูลเพิ่มเติมที่จะรวมในการยืนยันตัวตน (ไม่บังคับ)",
      verificationLevel: "ระดับการยืนยันตัวตน",
      verificationLevelDesc: "ตั้งค่าเป็นระดับการยืนยันตัวตน Orb",
      verifyButton: "ยืนยันตัวตนด้วย World ID",
      verifying: "กำลังยืนยันตัวตน...",
      successTitle: "ยืนยันตัวตนสำเร็จ",
      failedTitle: "การยืนยันตัวตนล้มเหลว",
      successMessage: "ผู้ใช้ได้รับการยืนยันว่าเป็นมนุษย์ที่ไม่ซ้ำกัน",
      detailsTitle: "รายละเอียดการยืนยันตัวตน",
      detailsDescription: "ข้อมูลการพิสูจน์จาก World ID",
      nullifierHash: "Nullifier Hash",
      merkleRoot: "Merkle Root",
      viewProof: "ดูข้อมูลการพิสูจน์",
      aboutTitle: "เกี่ยวกับการยืนยันตัวตน World ID",
      aboutContent1:
        "การดำเนินการแบบไม่เปิดเผยตัวตนของ World ID ช่วยให้คุณยืนยันมนุษย์ที่ไม่ซ้ำกันโดยไม่เปิดเผยตัวตนของพวกเขา เหมาะสำหรับการสร้างประสบการณ์ที่ปลอดบอทในเกม ระบบการลงคะแนน และอื่นๆ",
      aboutContent2:
        "กระบวนการยืนยันตัวตนใช้การพิสูจน์แบบ zero-knowledge เพื่อยืนยันว่าผู้ใช้เป็นมนุษย์ที่ไม่ซ้ำกันในขณะที่รักษาความเป็นส่วนตัวของพวกเขา",
    },
    wallet: {
      title: "เชื่อมต่อกระเป๋าเงิน",
      description: "เชื่อมต่อกระเป๋าเงิน World App ของคุณเพื่อยืนยันตัวตนและเข้าถึงการซื้อขาย $GHOSTART",
      connectButton: "เชื่อมต่อกระเป๋าเงิน World App",
      connected: "เชื่อมต่อกระเป๋าเงินแล้ว",
      address: "ที่อยู่",
      disconnect: "ตัดการเชื่อมต่อ",
      worldAppRequired: "ต้องใช้กระเป๋าเงิน World App สำหรับการยืนยัน KYC",
    },
    footer: {
      builtWith: "สร้างด้วย World ID MiniKit",
      support: "ฝ่ายสนับสนุน",
    },
    banner: {
      title: "เทรด GHOSTART บน PUF",
      description: "ช่วยให้ถึงเป้าหมาย 2000 WLD เพื่อเปิดตัวในแพลตฟอร์มเทรดดิ้งทั้งหมด!",
      tradeNow: "เทรดตอนนี้",
      target: "เป้าหมาย 2000 WLD",
      potential: "ศักยภาพผลตอบแทน 100x-1000x จากราคาปัจจุบัน!",
      currentPrice: "ปัจจุบัน: $0.000009 USDT",
    },
    tip: {
      title: "ส่งทิป",
      description: "สนับสนุนตลาด NFT GHOSTART โดยการส่งทิป",
      sendTip: "ส่งทิป",
      sendTipDescription: "ส่งโทเค็น WLD หรือ GHOSTART เป็นทิปเพื่อสนับสนุนตลาด",
      recipientAddress: "ที่อยู่ผู้รับ",
      amount: "จำนวน",
      selectToken: "เลือกโทเค็น",
      send: "ส่งทิป",
      sending: "กำลังส่ง...",
      successMessage: "ส่งทิปสำเร็จ!",
      viewTransaction: "ดูธุรกรรม",
      connectWalletError: "กรุณาเชื่อมต่อกระเป๋าเงินก่อน",
      invalidAmountError: "กรุณาใส่จำนวนที่ถูกต้อง",
      transactionFailed: "ธุรกรรมล้มเหลว กรุณาลองใหม่",
    },
    notifications: {
      title: "การแจ้งเตือน",
      subtitle: "ติดตามกิจกรรม NFT และเหตุการณ์ในตลาดของคุณ",
      enableTitle: "เปิดการแจ้งเตือน",
      enableDescription: "รับการแจ้งเตือนเกี่ยวกับกิจกรรม NFT การขาย และการอัปเดตตลาดของคุณ",
      enabled: "เปิดการแจ้งเตือนแล้ว",
      enabledDescription: "คุณจะได้รับการแจ้งเตือนเกี่ยวกับกิจกรรม NFT ของคุณ",
      denied: "ปิดการแจ้งเตือน",
      deniedDescription: "คุณสามารถเปิดการแจ้งเตือนในการตั้งค่าอุปกรณ์ของคุณ",
      checkAgain: "ตรวจสอบอีกครั้ง",
      requesting: "กำลังขอ...",
      enable: "เปิดการแจ้งเตือน",
      benefit1: "รับการแจ้งเตือนเมื่อ NFT ของคุณถูกสร้าง",
      benefit2: "รับการแจ้งเตือนสำหรับการขายและกิจกรรมในตลาด",
      benefit3: "ติดตามการรับ NFT ฟรีและรางวัล",
      typesTitle: "ประเภทการแจ้งเตือน",
      type1: "NFT ถูกสร้าง",
      type1Description: "เมื่อ NFT ของคุณถูกสร้างสำเร็จ",
      type2: "รับ NFT ฟรี",
      type2Description: "เมื่อคุณรับ NFT ฟรีของคุณ",
      type3: "NFT ถูกวางขาย",
      type3Description: "เมื่อ NFT ของคุณถูกวางขาย",
      type4: "NFT ถูกขาย",
      type4Description: "เมื่อ NFT ของคุณถูกขาย",
      guidelinesTitle: "แนวทางการแจ้งเตือน",
      guidelinesDescription: "เราปฏิบัติตามแนวทางของ World App: การแจ้งเตือนเป็นฟังก์ชัน มีความเกี่ยวข้อง และเกี่ยวข้องโดยตรงกับกิจกรรม NFT ของคุณ",
    },
  },
  ja: {
    home: {
      title: "GHOSTART 検証",
      description: "World ID のインコグニートアクションでユニークな人間を検証",
      content:
        "このアプリケーションは、World ID の MiniKit を使用してインコグニートアクションを通じてユニークな人間を検証し、ボットのない体験を保証する方法を示しています。",
      mobileOnly:
        "このアプリはモバイルの World App でのみ動作します。検証機能を使用するには、World App で開いてください。",
      button: "検証ページへ",
      qrTitle: "ミニアプリをテスト",
      qrDescription: "スマートフォンのカメラでQRコードをスキャンして、World Appでこのアプリを開きます。",
      tokenSubtitle: "PUF Mini Appでの早期取引 - ローンチ前に参加",
      potentialTitle: "大規模な成長の可能性",
      potentialDesc:
        "$GHOSTARTがマーケットプレイスでローンチされると、早期投資家は100倍から1000倍のリターンを得る可能性があります。",
      launchConditionTitle: "2000 WLDで自動ローンチ",
      launchConditionDesc: "マーケットプレイスが2000 WLDの取引量に達すると、トークンは自動的にローンチされます。",
      earlyAccessTitle: "早期取引が利用可能",
      earlyAccessDesc: "公式ローンチ前にPUFで早期参加し、潜在的なリターンを最大化しましょう。",
      tradeButton: "PUFで$GHOSTARTを取引",
    },
    verify: {
      title: "World ID 検証",
      subtitle: "World ID のインコグニートアクションでユニークな人間を検証",
      mobileOnlyTitle: "モバイルアプリが必要",
      mobileOnlyDesc: "この検証機能はモバイルデバイスの World App でのみ動作します。",
      mobileOnlyInstructions: "このアプリを使用するには、モバイルデバイスの World App で開いてください。",
      miniKitNotDetected: "MiniKit が検出されません",
      miniKitNotDetectedDesc: "検証機能を使用するには、World App でこのページを開いてください。",
      settingsTitle: "検証設定",
      settingsDescription: "インコグニートアクション検証を設定",
      actionLabel: "アクション ID",
      actionPlaceholder: "投票アクション",
      actionHelp: "Developer Portal からのアクション ID",
      signalLabel: "シグナル（オプション）",
      signalPlaceholder: "0x12312",
      signalHelp: "検証に含めるオプションの追加データ",
      verificationLevel: "検証レベル",
      verificationLevelDesc: "現在 Orb 検証レベルに設定されています",
      verifyButton: "World ID で検証",
      verifying: "検証中...",
      successTitle: "検証成功",
      failedTitle: "検証失敗",
      successMessage: "ユーザーはユニークな人間として検証されました。",
      detailsTitle: "検証の詳細",
      detailsDescription: "World ID からの証明情報",
      nullifierHash: "Nullifier Hash",
      merkleRoot: "Merkle Root",
      viewProof: "証明データを表示",
      aboutTitle: "World ID 検証について",
      aboutContent1:
        "World ID のインコグニートアクションを使用すると、身元を明かすことなくユニークな人間を検証できます。これは、ゲーム、投票システムなどでボットのない体験を作成するのに最適です。",
      aboutContent2:
        "検証プロセスは、ゼロ知識証明を使用してユーザーがユニークな人間であることを確認しながら、プライバシーを維持します。",
    },
    wallet: {
      title: "ウォレットを接続",
      description: "World Appウォレットを接続して本人確認を行い、$GHOSTARTの取引にアクセスします。",
      connectButton: "World Appウォレットを接続",
      connected: "ウォレット接続済み",
      address: "アドレス",
      disconnect: "切断",
      worldAppRequired: "KYC検証にはWorld Appウォレットが必要です",
    },
    footer: {
      builtWith: "World ID MiniKit で構築",
      support: "サポート",
    },
    banner: {
      title: "PUFでGHOSTARTを取引",
      description: "すべての取引プラットフォームでローンチするために2000 WLD目標の達成を支援！",
      tradeNow: "今すぐ取引",
      target: "2000 WLD目標",
      potential: "現在の価格から100倍〜1000倍のリターンの可能性！",
      currentPrice: "現在: $0.000009 USDT",
    },
    tip: {
      title: "チップを送る",
      description: "チップを送ってGHOSTART NFTマーケットプレイスをサポート",
      sendTip: "チップを送る",
      sendTipDescription: "マーケットプレイスをサポートするためにWLDまたはGHOSTARTトークンをチップとして送信",
      recipientAddress: "受信者アドレス",
      amount: "金額",
      selectToken: "トークンを選択",
      send: "チップを送る",
      sending: "送信中...",
      successMessage: "チップが正常に送信されました！",
      viewTransaction: "トランザクションを表示",
      connectWalletError: "まずウォレットを接続してください",
      invalidAmountError: "有効な金額を入力してください",
      transactionFailed: "トランザクションが失敗しました。再試行してください。",
    },
    notifications: {
      title: "通知",
      subtitle: "NFTアクティビティとマーケットプレイスイベントの最新情報を取得",
      enableTitle: "通知を有効にする",
      enableDescription: "NFTアクティビティ、売却、マーケットプレイスの更新について通知を受け取る",
      enabled: "通知が有効",
      enabledDescription: "NFTアクティビティについて通知を受け取ります",
      denied: "通知が無効",
      deniedDescription: "デバイス設定で通知を有効にできます",
      checkAgain: "再確認",
      requesting: "リクエスト中...",
      enable: "通知を有効にする",
      benefit1: "NFTがミントされたときに通知を受け取る",
      benefit2: "売却とマーケットプレイスアクティビティのアラートを受け取る",
      benefit3: "無料NFTクレームと報酬の最新情報を取得",
      typesTitle: "通知タイプ",
      type1: "NFTミント済み",
      type1Description: "NFTが正常にミントされたとき",
      type2: "無料NFTクレーム済み",
      type2Description: "無料NFTをクレームしたとき",
      type3: "NFT出品済み",
      type3Description: "NFTが売却用に出品されたとき",
      type4: "NFT売却済み",
      type4Description: "NFTが売却されたとき",
      guidelinesTitle: "通知ガイドライン",
      guidelinesDescription: "World Appガイドラインに従います：通知は機能的で、関連性があり、NFTアクティビティに直接関連しています。",
    },
  },
  ko: {
    home: {
      title: "GHOSTART 검증",
      description: "World ID 익명 작업으로 고유한 사람 검증",
      content:
        "이 애플리케이션은 World ID의 MiniKit을 사용하여 익명 작업을 통해 고유한 사람을 검증하고 봇 없는 경험을 보장하는 방법을 보여줍니다.",
      mobileOnly: "이 앱은 모바일의 World App에서만 작동합니다. 검증 기능을 사용하려면 World App에서 여세요.",
      button: "검증 페이지로 이동",
      qrTitle: "미니 앱 테스트",
      qrDescription: "휴대폰 카메라로 QR 코드를 스캔하여 World App에서 이 앱을 여세요.",
      tokenSubtitle: "PUF Mini App에서 조기 거래 - 출시 전 참여",
      potentialTitle: "대규모 성장 잠재력",
      potentialDesc: "$GHOSTART가 마켓플레이스에 출시되면 초기 투자자는 100배-1000배의 수익을 볼 수 있습니다.",
      launchConditionTitle: "2000 WLD에서 자동 출시",
      launchConditionDesc: "마켓플레이스가 2000 WLD 거래량에 도달하면 토큰이 자동으로 출시됩니다.",
      earlyAccessTitle: "조기 거래 가능",
      earlyAccessDesc: "공식 출시 전에 PUF에서 조기 참여하여 잠재적 수익을 극대화하세요.",
      tradeButton: "PUF에서 $GHOSTART 거래",
    },
    verify: {
      title: "World ID 검증",
      subtitle: "World ID 익명 작업으로 고유한 사람 검증",
      mobileOnlyTitle: "모바일 앱 필요",
      mobileOnlyDesc: "이 검증 기능은 모바일 기기의 World App에서만 작동합니다.",
      mobileOnlyInstructions: "이 앱을 사용하려면 모바일 기기의 World App에서 여세요.",
      miniKitNotDetected: "MiniKit이 감지되지 않음",
      miniKitNotDetectedDesc: "검증 기능을 사용하려면 World App에서 이 페이지를 여세요.",
      settingsTitle: "검증 설정",
      settingsDescription: "익명 작업 검증 구성",
      actionLabel: "작업 ID",
      actionPlaceholder: "투표-작업",
      actionHelp: "개발자 포털의 작업 ID",
      signalLabel: "신호 (선택사항)",
      signalPlaceholder: "0x12312",
      signalHelp: "검증에 포함할 선택적 추가 데이터",
      verificationLevel: "검증 레벨",
      verificationLevelDesc: "현재 Orb 검증 레벨로 설정됨",
      verifyButton: "World ID로 검증",
      verifying: "검증 중...",
      successTitle: "검증 성공",
      failedTitle: "검증 실패",
      successMessage: "사용자가 고유한 사람으로 검증되었습니다.",
      detailsTitle: "검증 세부정보",
      detailsDescription: "World ID의 증명 정보",
      nullifierHash: "Nullifier Hash",
      merkleRoot: "Merkle Root",
      viewProof: "증명 데이터 보기",
      aboutTitle: "World ID 검증 정보",
      aboutContent1:
        "World ID 익명 작업을 사용하면 신원을 공개하지 않고 고유한 사람을 검증할 수 있습니다. 게임, 투표 시스템 등에서 봇 없는 경험을 만드는 데 완벽합니다.",
      aboutContent2:
        "검증 프로세스는 영지식 증명을 사용하여 사용자가 고유한 사람임을 확인하면서 개인정보를 유지합니다.",
    },
    wallet: {
      title: "지갑 연결",
      description: "World App 지갑을 연결하여 신원을 확인하고 $GHOSTART 거래에 액세스하세요.",
      connectButton: "World App 지갑 연결",
      connected: "지갑 연결됨",
      address: "주소",
      disconnect: "연결 해제",
      worldAppRequired: "KYC 검증을 위해 World App 지갑이 필요합니다",
    },
    footer: {
      builtWith: "World ID MiniKit로 제작",
      support: "지원",
    },
    banner: {
      title: "PUF에서 GHOSTART 거래",
      description: "모든 거래 플랫폼에서 출시하기 위해 2000 WLD 목표 달성을 도와주세요!",
      tradeNow: "지금 거래",
      target: "2000 WLD 목표",
      potential: "현재 가격에서 100배-1000배 수익 잠재력!",
      currentPrice: "현재: $0.000009 USDT",
    },
    tip: {
      title: "팁 보내기",
      description: "팁을 보내서 GHOSTART NFT 마켓플레이스를 지원하세요",
      sendTip: "팁 보내기",
      sendTipDescription: "마켓플레이스를 지원하기 위해 WLD 또는 GHOSTART 토큰을 팁으로 보내세요",
      recipientAddress: "수신자 주소",
      amount: "금액",
      selectToken: "토큰 선택",
      send: "팁 보내기",
      sending: "전송 중...",
      successMessage: "팁이 성공적으로 전송되었습니다!",
      viewTransaction: "거래 보기",
      connectWalletError: "먼저 지갑을 연결해주세요",
      invalidAmountError: "유효한 금액을 입력해주세요",
      transactionFailed: "거래가 실패했습니다. 다시 시도해주세요.",
    },
    notifications: {
      title: "알림",
      subtitle: "NFT 활동 및 마켓플레이스 이벤트의 최신 정보를 받아보세요",
      enableTitle: "알림 활성화",
      enableDescription: "NFT 활동, 판매, 마켓플레이스 업데이트에 대한 알림을 받으세요",
      enabled: "알림 활성화됨",
      enabledDescription: "NFT 활동에 대한 알림을 받게 됩니다",
      denied: "알림 비활성화됨",
      deniedDescription: "기기 설정에서 알림을 활성화할 수 있습니다",
      checkAgain: "다시 확인",
      requesting: "요청 중...",
      enable: "알림 활성화",
      benefit1: "NFT가 민팅될 때 알림을 받으세요",
      benefit2: "판매 및 마켓플레이스 활동에 대한 알림을 받으세요",
      benefit3: "무료 NFT 클레임 및 보상의 최신 정보를 받으세요",
      typesTitle: "알림 유형",
      type1: "NFT 민팅됨",
      type1Description: "NFT가 성공적으로 민팅될 때",
      type2: "무료 NFT 클레임됨",
      type2Description: "무료 NFT를 클레임할 때",
      type3: "NFT 등록됨",
      type3Description: "NFT가 판매용으로 등록될 때",
      type4: "NFT 판매됨",
      type4Description: "NFT가 판매될 때",
      guidelinesTitle: "알림 가이드라인",
      guidelinesDescription: "World App 가이드라인을 따릅니다: 알림은 기능적이고, 관련성이 있으며, NFT 활동과 직접적으로 관련이 있습니다.",
    },
  },
  pt: {
    home: {
      title: "Verificação GHOSTART",
      description: "Verifique humanos únicos com ações incógnitas do World ID",
      content:
        "Esta aplicação demonstra como usar o MiniKit do World ID para verificar humanos únicos através de ações incógnitas, garantindo experiências livres de bots.",
      mobileOnly:
        "Este aplicativo funciona apenas no World App em dispositivos móveis. Por favor, abra-o no World App para usar os recursos de verificação.",
      button: "Ir para Página de Verificação",
      qrTitle: "Teste Seu Mini App",
      qrDescription: "Escaneie o código QR com a câmera do seu telefone para abrir este aplicativo no World App.",
      tokenSubtitle: "Negociação Antecipada no PUF Mini App - Participe Antes do Lançamento",
      potentialTitle: "Potencial de Crescimento Massivo",
      potentialDesc: "Investidores iniciais podem ver retornos de 100x-1000x quando $GHOSTART for lançado no mercado.",
      launchConditionTitle: "Lançamento Automático em 2000 WLD",
      launchConditionDesc:
        "O token será lançado automaticamente quando o mercado atingir 2000 WLD de volume de negociação.",
      earlyAccessTitle: "Negociação Antecipada Disponível Agora",
      earlyAccessDesc: "Entre cedo no PUF antes do lançamento oficial e maximize seus retornos potenciais.",
      tradeButton: "Negociar $GHOSTART no PUF",
    },
    verify: {
      title: "Verificação World ID",
      subtitle: "Verifique humanos únicos com ações incógnitas do World ID",
      mobileOnlyTitle: "Aplicativo Móvel Necessário",
      mobileOnlyDesc: "Este recurso de verificação funciona apenas no World App em dispositivos móveis.",
      mobileOnlyInstructions: "Para usar este aplicativo, por favor abra-o no World App em seu dispositivo móvel.",
      miniKitNotDetected: "MiniKit Não Detectado",
      miniKitNotDetectedDesc: "Por favor, abra esta página no World App para usar os recursos de verificação.",
      settingsTitle: "Configurações de Verificação",
      settingsDescription: "Configure sua verificação de ação incógnita",
      actionLabel: "ID da Ação",
      actionPlaceholder: "acao-votacao",
      actionHelp: "O ID da ação do seu Portal de Desenvolvedor",
      signalLabel: "Sinal (Opcional)",
      signalPlaceholder: "0x12312",
      signalHelp: "Dados adicionais opcionais para incluir na verificação",
      verificationLevel: "Nível de Verificação",
      verificationLevelDesc: "Atualmente definido para nível de verificação Orb",
      verifyButton: "Verificar com World ID",
      verifying: "Verificando...",
      successTitle: "Verificação Bem-sucedida",
      failedTitle: "Verificação Falhou",
      successMessage: "O usuário foi verificado como um humano único.",
      detailsTitle: "Detalhes da Verificação",
      detailsDescription: "Informações de prova do World ID",
      nullifierHash: "Nullifier Hash",
      merkleRoot: "Merkle Root",
      viewProof: "Ver Dados de Prova",
      aboutTitle: "Sobre a Verificação World ID",
      aboutContent1:
        "As ações incógnitas do World ID permitem verificar humanos únicos sem revelar sua identidade. Isso é perfeito para criar experiências livres de bots em jogos, sistemas de votação e muito mais.",
      aboutContent2:
        "O processo de verificação usa provas de conhecimento zero para confirmar que um usuário é um humano único enquanto mantém sua privacidade.",
    },
    wallet: {
      title: "Conectar Carteira",
      description: "Conecte sua carteira World App para verificar sua identidade e acessar a negociação de $GHOSTART.",
      connectButton: "Conectar Carteira World App",
      connected: "Carteira Conectada",
      address: "Endereço",
      disconnect: "Desconectar",
      worldAppRequired: "Carteira World App necessária para verificação KYC",
    },
    footer: {
      builtWith: "Construído com World ID MiniKit",
      support: "Suporte",
    },
    banner: {
      title: "Negociar GHOSTART no PUF",
      description: "Ajude a atingir o objetivo de 2000 WLD para lançar em todas as plataformas de trading!",
      tradeNow: "Negociar Agora",
      target: "Objetivo 2000 WLD",
      potential: "Potencial de retornos 100x-1000x do preço atual!",
      currentPrice: "Atual: $0.000009 USDT",
    },
    tip: {
      title: "Enviar Gorjeta",
      description: "Apoie o mercado de NFTs GHOSTART enviando uma gorjeta",
      sendTip: "Enviar Gorjeta",
      sendTipDescription: "Envie tokens WLD ou GHOSTART como gorjeta para apoiar o mercado",
      recipientAddress: "Endereço do Destinatário",
      amount: "Quantia",
      selectToken: "Selecionar Token",
      send: "Enviar Gorjeta",
      sending: "Enviando...",
      successMessage: "Gorjeta enviada com sucesso!",
      viewTransaction: "Ver Transação",
      connectWalletError: "Por favor conecte sua carteira primeiro",
      invalidAmountError: "Por favor insira uma quantia válida",
      transactionFailed: "A transação falhou. Por favor tente novamente.",
    },
    notifications: {
      title: "Notificações",
      subtitle: "Mantenha-se atualizado com suas atividades de NFT e eventos do mercado",
      enableTitle: "Habilitar Notificações",
      enableDescription: "Receba notificações sobre suas atividades de NFT, vendas e atualizações do mercado",
      enabled: "Notificações Habilitadas",
      enabledDescription: "Você receberá notificações sobre suas atividades de NFT",
      denied: "Notificações Desabilitadas",
      deniedDescription: "Você pode habilitar notificações nas configurações do seu dispositivo",
      checkAgain: "Verificar Novamente",
      requesting: "Solicitando...",
      enable: "Habilitar Notificações",
      benefit1: "Receba notificações quando seus NFTs forem cunhados",
      benefit2: "Receba alertas para vendas e atividade do mercado",
      benefit3: "Mantenha-se atualizado com reivindicações de NFT gratuitos e recompensas",
      typesTitle: "Tipos de Notificações",
      type1: "NFT Cunhado",
      type1Description: "Quando seu NFT for cunhado com sucesso",
      type2: "NFT Gratuito Reivindicado",
      type2Description: "Quando você reivindicar seu NFT gratuito",
      type3: "NFT Listado",
      type3Description: "Quando seu NFT for listado para venda",
      type4: "NFT Vendido",
      type4Description: "Quando seu NFT for vendido",
      guidelinesTitle: "Diretrizes de Notificações",
      guidelinesDescription: "Seguimos as diretrizes do World App: as notificações são funcionais, relevantes e diretamente relacionadas às suas atividades de NFT.",
    },
  },
}

export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations.en
}
