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
  },
}

export function getTranslations(locale: Locale): Translations {
  return translations[locale] || translations.en
}
