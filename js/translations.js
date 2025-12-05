// ===== TRANSLATION SYSTEM - IMPROVED =====
(function() {
    'use strict';

    // Translation data
    const translations = {
        en: {
            // Navigation
            'nav.logo': 'MR',
            'nav.brand': 'Mohamed Riadh',
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.expertise': 'Expertise',
            'nav.projects': 'Projects',
            'nav.blog': 'Blog',
            'nav.contact': 'Contact',
            'nav.language.english': 'English',
            'nav.language.arabic': 'العربية',
            'nav.language.french': 'Français',
            
            // Hero Section
            'hero.badge': 'Programmer & Cybersecurity Specialist',
            'hero.title.line1': 'Hello, I\'m',
            'hero.title.line2': 'Mohamed Riadh',
            'hero.title.line3': 'Cybersecurity Expert, Web Developer',
            'hero.description': 'Mohamed Riadh is a leading cybersecurity expert specializing in penetration testing, cloud security architecture, and professional web development. Building secure digital solutions and delivering high-impact websites in just 7 days. Expert in ethical hacking, security consulting, financial market analysis, and professional voiceover services.',
            'hero.cta.work': 'View My Work',
            'hero.cta.contact': 'Get Your Professional Website in 7 Days',
            'hero.scroll': 'Scroll to explore',
            
            // Hero Social Links
            'hero.social.linkedin': 'LinkedIn',
            
            'hero.social.twitter': 'Twitter',
            'hero.social.instagram': 'Instagram',
            'hero.social.email': 'Email',
            
            // Floating Cards
            'hero.floating.security': 'Security Expert',
            'hero.floating.market': 'Market Analyst',
            'hero.floating.developer': 'Developer',
            
            // About Section
            'about.title': 'About Me',
            'about.subtitle': 'Passionate about securing digital assets and optimizing financial strategies',
            'about.intro.title': 'Mohamed Riadh - Cybersecurity Expert, Professional Web Developer',
            'about.intro.text': 'My name is Mohamed Riadh, and I am a certified cybersecurity expert, professional web developer, and voiceover artist with over 6 years of experience in penetration testing, ethical hacking, secure web development, and audio production.',
            'about.experience.title': 'Professional Experience',
            'about.experience.text': 'Over 6 years of experience in cybersecurity consulting, penetration testing, and professional web development. Successfully delivered 50+ secure websites and web applications, conducted 100+ security assessments.',
            'about.achievements.title': 'Achievements',
            'about.achievements.text': 'Successfully secured 25+ enterprise systems through comprehensive penetration testing and vulnerability assessment. Delivered 50+ professional websites and web applications with 100% client satisfaction.',
            'about.cta': 'Let\'s Work Together',
            
            // Expertise Section
            'expertise.title': 'Areas of Expertise',
            'expertise.subtitle': 'Comprehensive skills across cybersecurity and financial markets',
            'expertise.cybersecurity.title': 'Cybersecurity & Ethical Hacking',
            'expertise.cybersecurity.description': 'Comprehensive cybersecurity solutions including professional penetration testing, vulnerability assessment, ethical hacking, and secure architecture design for enterprise clients.',
            'expertise.cybersecurity.level': 'Expert Level',
            'expertise.financial.title': 'Financial Analysis',
            'expertise.financial.description': 'Advanced market analysis and algorithmic trading strategies for forex, crypto, and traditional markets.',
            'expertise.financial.level': 'Advanced Level',
            'expertise.web.title': 'Professional Web Development',
            'expertise.web.description': 'Full-stack web development with focus on secure, scalable applications, e-commerce platforms, and modern web technologies. Delivering high-impact websites in 7 days.',
            'expertise.web.level': 'Proficient Level',
            
            // Projects Section
            'projects.title': 'Featured Projects',
            'projects.subtitle': 'Showcasing my best work across security, finance, and development',
            'projects.web.category': 'Web Development',
            'projects.web.title': 'Website Development',
            'projects.web.description': 'A comprehensive platform for managing and developing websites for individuals and companies. Built with secure web development practices and ethical hacking principles.',
            
            'projects.security.category': 'Cybersecurity',
            'projects.security.title': 'Professional Penetration Testing Framework',
            'projects.security.description': 'Automated security testing platform with comprehensive vulnerability scanning, ethical hacking tools, and detailed security reporting for enterprise clients.',
            'projects.cta': 'Launch Your Professional Website Today',
            
            // Sites Page
            'sitesHeading': 'Enterprise Web Development & Software Engineering Excellence',
            'sitesIntro1': 'Welcome to my professional web development portfolio, showcasing enterprise-grade solutions and modern software engineering projects. Each project represents a commitment to excellence, innovation, and industry best practices.',
            'sitesIntro2': 'From scalable e-commerce platforms to sophisticated educational systems, these projects demonstrate my expertise in creating robust, user-centric applications that drive business value and deliver exceptional user experiences.',
            'site1Title': 'Enterprise E-commerce Platform',
            'site1Desc': 'Get a professional e-commerce website with all the modern and professional features to become a successful e-commerce merchant and increase your sales.',
            'site3Title': 'Educational Learning Platform',
            'site3Desc': 'Created a comprehensive educational platform with interactive learning modules, progress tracking, and comprehensive course management. Features adaptive learning paths and performance analytics.',
            'site4Title': 'Services Company Website',
            'site4Desc': 'Developed a professional services company website with modern design, client testimonials, service showcase, and contact forms. Features responsive design and SEO optimization.',
            'site5Title': 'Professional Portfolio Website',
            'site5Desc': 'Designed and developed a modern portfolio website with advanced animations, optimal performance, and professional presentation. Features smooth transitions and interactive elements.',
            'site6Title': 'Mohamed Riadh Portfolio',
            'site6Desc': 'Of course 😅 As a programmer, I am the one who programmed and developed my portfolio website',
            'viewLiveSite': 'View Live Site',
            'viewCode': 'All site',
            'footerText': '© 2025 Mohamed Riadh. All rights reserved.',
            
            // Contact Section
            'contact.intro': 'Tell us your idea, and get a detailed plan & quote within 24 hours.',
            'contact.title': 'Let\'s Launch Your Project in 7 Days',
            'contact.subtitle': 'Let\'s bring your vision to life. Whether it\'s securing systems through professional penetration testing, developing high-impact websites with secure coding practices, or implementing comprehensive cybersecurity solutions, I\'m ready to deliver excellence.',
            'contact.email': 'Email',
            'contact.phone': 'Phone',
            'contact.location': 'Location',
            'contact.location.text': 'Algeria, Available Worldwide',
            
            // Footer
            'footer.brand': 'Mohamed Riadh',
            'footer.tagline': 'Mohamed Riadh - Securing digital futures through professional cybersecurity expertise, innovative web development, and professional voiceover services',
            'footer.services.title': 'Services',
            'footer.services.security': 'Cybersecurity Consulting & Penetration Testing',
            'footer.services.web': 'Professional Web Development',
            'footer.services.analysis': 'Financial Market Analysis',
            'footer.services.testing': 'Ethical Hacking & Security Testing',
            'footer.resources.title': 'Resources',
            'footer.resources.blog': 'Blog',
            'footer.resources.about': 'About',
            'footer.resources.contact': 'Contact',
            'footer.resources.portfolio': 'Portfolio',
            'footer.connect.title': 'Connect',
            'footer.copyright': '© 2025 Mohamed Riadh. All rights reserved.',
            
            // Start Website Section
            'start-website.title': 'Ready to Launch Your Website?',
            'start-website.subtitle': 'Let\'s turn your vision into a powerful, secure online presence that drives results and protects your business.',
            'start-website.button': 'Get Your High Impact Website Today',
            
            // Chatbot
            'chatbot.tooltip': 'Chat with AI Assistant',
            
            // Navigation Help
            'nav.help.title': 'Quick Navigation',
            'nav.help.sections': 'Press 1-6 to jump to sections',
            'nav.help.navigation': 'Press Home / End for top/bottom',
            
            // Loading
            'loading.text': 'Loading Portfolio...'
        },
        ar: {
            // Navigation
            'nav.logo': 'م ر',
            'nav.brand': 'محمد رياض',
            'nav.home': 'الرئيسية',
            'nav.about': 'حول',
            'nav.expertise': 'الخبرات',
            'nav.projects': 'المشاريع',
            'nav.blog': 'المدونة',
            'nav.contact': 'اتصل',
            'nav.language.english': 'English',
            'nav.language.arabic': 'العربية',
            'nav.language.french': 'Français',
            
            // Hero Section
            'hero.badge': 'خبير الأمن السيبراني والمالي',
            'hero.title.line1': 'مرحباً، أنا',
            'hero.title.line2': 'محمد رياض',
            'hero.title.line3': 'خبير أمن سيبراني، مطور مواقع وفنان تعليق صوتي',
            'hero.description': 'محمد رياض خبير أمن سيبراني رائد متخصص في اختبار الاختراق، هندسة أمان السحابة، وتطوير الويب الاحترافي. بناء حلول رقمية آمنة وتقديم مواقع ويب عالية التأثير في 7 أيام فقط. خبير في القرصنة الأخلاقية، الاستشارات الأمنية، تحليل الأسواق المالية، وخدمات التعليق الصوتي الاحترافية.',
            'hero.cta.work': 'شاهد أعمالي',
            'hero.cta.contact': 'احصل على موقعك الاحترافي في 7 أيام',
            'hero.scroll': 'مرر للاستكشاف',
            
            // Hero Social Links
            'hero.social.linkedin': 'لينكد إن',
            
            'hero.social.twitter': 'تويتر',
            'hero.social.instagram': 'إنستغرام',
            'hero.social.email': 'البريد الإلكتروني',
            
            // Floating Cards
            'hero.floating.security': 'خبير الأمان',
            'hero.floating.market': 'محلل الأسواق',
            'hero.floating.developer': 'مطور',
            
            // About Section
            'about.title': 'حول',
            'about.subtitle': 'شغوف بتأمين الأصول الرقمية وتحسين الاستراتيجيات المالية',
            'about.intro.title': 'محمد رياض - خبير أمن سيبراني، مطور مواقع محترف وفنان تعليق صوتي',
            'about.intro.text': 'اسمي محمد رياض، وأنا خبير أمن سيبراني معتمد، مطور مواقع محترف، وفنان تعليق صوتي مع أكثر من 6 سنوات من الخبرة في اختبار الاختراق، القرصنة الأخلاقية، تطوير الويب الآمن، والإنتاج الصوتي.',
            'about.experience.title': 'الخبرة المهنية',
            'about.experience.text': 'أكثر من 6 سنوات من الخبرة في استشارات الأمن السيبراني، اختبار الاختراق، وتطوير الويب الاحترافي. نجحت في تسليم أكثر من 50 موقع ويب وتطبيق آمن، وأجريت أكثر من 100 تقييم أمني.',
            'about.achievements.title': 'الإنجازات',
            'about.achievements.text': 'نجحت في تأمين أكثر من 25 نظامًا مؤسسيًا من خلال اختبار الاختراق الشامل وتقييم الثغرات. قدمت أكثر من 50 موقع ويب وتطبيق احترافي مع رضا العملاء بنسبة 100٪.',
            'about.cta': 'دعنا نعمل معاً',
            
            // Expertise Section
            'expertise.title': 'مجالات الخبرة',
            'expertise.subtitle': 'مهارات شاملة في الأمن السيبراني والأسواق المالية',
            'expertise.cybersecurity.title': 'الأمن السيبراني والقرصنة الأخلاقية',
            'expertise.cybersecurity.description': 'حلول الأمن السيبراني الشاملة بما في ذلك اختبار الاختراق الاحترافي، تقييم الثغرات، القرصنة الأخلاقية، وتصميم البنية المعمارية الآمنة للعملاء المؤسسيين.',
            'expertise.cybersecurity.level': 'مستوى الخبير',
            'expertise.financial.title': 'التحليل المالي',
            'expertise.financial.description': 'تحليل متقدم للسوق واستراتيجيات التداول الخوارزمي للفوركس والعملات المشفرة والأسواق التقليدية.',
            'expertise.financial.level': 'مستوى متقدم',
            'expertise.web.title': 'تطوير الويب الاحترافي',
            'expertise.web.description': 'تطوير الويب الشامل مع التركيز على التطبيقات الآمنة والقابلة للتوسع، منصات التجارة الإلكترونية، وتقنيات الويب الحديثة. تقديم مواقع ويب عالية التأثير في 7 أيام.',
            'expertise.web.level': 'مستوى متقن',
            
            // Projects Section
            'projects.title': 'المشاريع المميزة',
            'projects.subtitle': 'عرض أفضل أعمالي في الأمان والمالية والتطوير',
            'projects.web.category': 'تطوير الويب',
            'projects.web.title': 'تطوير المواقع الإلكترونية',
            'projects.web.description': 'منصة شاملة لإدارة وتطوير المواقع الإلكترونية للأفراد والشركات. مبني بممارسات تطوير الويب الآمنة ومبادئ القرصنة الأخلاقية.',
            
            'projects.security.category': 'الأمن السيبراني',
            'projects.security.title': 'إطار اختبار الاختراق الاحترافي',
            'projects.security.description': 'منصة اختبار أمان آلية مع فحص شامل للثغرات، أدوات القرصنة الأخلاقية، وتقارير أمنية مفصلة للعملاء المؤسسيين.',
            'projects.cta': 'أطلق موقعك الاحترافي اليوم',
            
            // Sites Page
            'sitesHeading': 'تطوير الويب المؤسسي وتميز هندسة البرمجيات',
            'sitesIntro1': 'مرحبًا بك في محفظة تطوير الويب الاحترافية الخاصة بي، والتي تعرض حلولاً على مستوى المؤسسات ومشاريع هندسة برمجيات حديثة. يمثل كل مشروع التزامًا بالتميز والابتكار وأفضل ممارسات الصناعة.',
            'sitesIntro2': 'من منصات التجارة الإلكترونية القابلة للتوسع إلى الأنظمة التعليمية المتطورة، توضح هذه المشاريع خبرتي في إنشاء تطبيقات قوية تتمحور حول المستخدم تحقق قيمة تجارية وتقدم تجارب مستخدم استثنائية.',
            'site1Title': 'منصة التجارة الإلكترونية المؤسسية',
            'site1Desc': 'احصل على موقع تجارة إلكترونية احترافي بكل الميزات الحديثة والاحترافية لتصبح تاجرًا ناجحًا في التجارة الإلكترونية وزيادة مبيعاتك.',
            'site3Title': 'منصة التعلم التعليمية',
            'site3Desc': 'تم إنشاء منصة تعليمية شاملة مع وحدات تعليمية تفاعلية، تتبع التقدم، وإدارة شاملة للدورات. تتميز بمسارات تعليمية تكيفية وتحليلات الأداء.',
            'site4Title': 'موقع شركة الخدمات',
            'site4Desc': 'تم تطوير موقع ويب احترافي لشركة خدمات بتصميم حديث، شهادات العملاء، عرض الخدمات، ونماذج الاتصال. يتميز بتصميم متجاوب وتحسين SEO.',
            'site5Title': 'موقع محفظة احترافي',
            'site5Desc': 'تم تصميم وتطوير موقع محفظة حديث مع رسوم متحركة متقدمة، أداء مثالي، وعرض احترافي. يتميز بانتقالات سلسة وعناصر تفاعلية.',
            'site6Title': 'محفظة محمد رياض',
            'site6Desc': 'بالطبع 😅 كمبرمج، أنا من قام ببرمجة وتطوير موقع محفظتي',
            'viewLiveSite': 'عرض الموقع المباشر',
            'viewCode': 'جميع المواقع',
            'footerText': '© 2025 محمد رياض. جميع الحقوق محفوظة.',
            
            // Contact Section
            'contact.intro': 'أخبرنا بفكرتك، واحصل على خطة مفصلة وعرض سعر خلال 24 ساعة.',
            'contact.title': 'لنطلق مشروعك في 7 أيام',
            'contact.subtitle': 'دعنا نحول رؤيتك إلى واقع. سواء كان الأمر يتعلق بتأمين الأنظمة من خلال اختبار الاختراق الاحترافي، أو تطوير مواقع ويب عالية التأثير بممارسات الترميز الآمنة، أو تنفيذ حلول الأمن السيبراني الشاملة، فأنا جاهز لتقديم التميز.',
            'contact.email': 'البريد الإلكتروني',
            'contact.phone': 'الهاتف',
            'contact.location': 'الموقع',
            'contact.location.text': 'الجزائر، متاح عالمياً',
            
            // Footer
            'footer.brand': 'محمد رياض',
            'footer.tagline': 'تأمين المستقبل الرقمي من خلال الابتكار والخبرة',
            'footer.services.title': 'الخدمات',
            'footer.services.security': 'استشارات الأمن السيبراني واختبار الاختراق',
            'footer.services.web': 'تطوير الويب الاحترافي',
            'footer.services.analysis': 'تحليل الأسواق المالية',
            'footer.services.testing': 'القرصنة الأخلاقية واختبار الأمان',
            'footer.resources.title': 'الموارد',
            'footer.resources.blog': 'المدونة',
            'footer.resources.about': 'حول',
            'footer.resources.contact': 'اتصل',
            'footer.resources.portfolio': 'المحفظة',
            'footer.connect.title': 'تواصل',
            'footer.copyright': '© 2025 محمد رياض. جميع الحقوق محفوظة.',
            
            // Start Website Section
            'start-website.title': 'هل أنت مستعد لإطلاق موقعك الإلكتروني؟',
            'start-website.subtitle': 'دعنا نحول رؤيتك إلى حضور قوي وآمن على الإنترنت يحقق النتائج ويحمي عملك.',
            'start-website.button': 'احصل على موقعك عالي التأثير اليوم',
            
            // Chatbot
            'chatbot.tooltip': 'دردشة مع المساعد الذكي',
            
            // Navigation Help
            'nav.help.title': 'التنقل السريع',
            'nav.help.sections': 'اضغط 1-6 للانتقال إلى الأقسام',
            'nav.help.navigation': 'اضغط Home / End للانتقال للأعلى/الأسفل',
            
            // Loading
            'loading.text': 'جاري تحميل المحفظة...'
        },
        fr: {
            // Navigation
            'nav.logo': 'MR',
            'nav.brand': 'Mohamed Riadh',
            'nav.home': 'Accueil',
            'nav.about': 'À propos',
            'nav.expertise': 'Expertise',
            'nav.projects': 'Projets',
            'nav.blog': 'Blog',
            'nav.contact': 'Contact',
            'nav.language.english': 'English',
            'nav.language.arabic': 'العربية',
            'nav.language.french': 'Français',
            
            // Hero Section
            'hero.badge': 'Expert en Cybersécurité et Finance',
            'hero.title.line1': 'Bonjour, je suis',
            'hero.title.line2': 'Mohamed Riadh',
            'hero.title.line3': 'Expert en cybersécurité, développeur web et artiste voix off',
            'hero.description': 'Mohamed Riadh est un expert en cybersécurité de premier plan spécialisé dans les tests de pénétration, l\'architecture de sécurité cloud et le développement web professionnel. Création de solutions numériques sécurisées et livraison de sites web à fort impact en seulement 7 jours. Expert en piratage éthique, conseil en sécurité, analyse des marchés financiers et services de voix off professionnels.',
            'hero.cta.work': 'Voir mes travaux',
            'hero.cta.contact': 'Obtenez votre site web professionnel en 7 jours',
            'hero.scroll': 'Faites défiler pour explorer',
            
            // Hero Social Links
            'hero.social.linkedin': 'LinkedIn',
            
            'hero.social.twitter': 'Twitter',
            'hero.social.instagram': 'Instagram',
            'hero.social.email': 'Email',
            
            // Floating Cards
            'hero.floating.security': 'Expert en Sécurité',
            'hero.floating.market': 'Analyste de Marché',
            'hero.floating.developer': 'Développeur',
            
            // About Section
            'about.title': 'À propos',
            'about.subtitle': 'Passionné par la sécurisation des actifs numériques et l\'optimisation des stratégies financières',
            'about.intro.title': 'Mohamed Riadh - Expert en cybersécurité, développeur web professionnel et artiste voix off',
            'about.intro.text': 'Je m\'appelle Mohamed Riadh et je suis un expert certifié en cybersécurité, développeur web professionnel et artiste voix off avec plus de 6 ans d\'expérience dans les tests de pénétration, le piratage éthique, le développement web sécurisé et la production audio.',
            'about.experience.title': 'Expérience professionnelle',
            'about.experience.text': 'Plus de 6 ans d\'expérience dans le conseil en cybersécurité, les tests de pénétration et le développement web professionnel. J\'ai livré avec succès plus de 50 sites web et applications sécurisés, réalisé plus de 100 évaluations de sécurité.',
            'about.achievements.title': 'Réalisations',
            'about.achievements.text': 'J\'ai sécurisé avec succès plus de 25 systèmes d\'entreprise grâce à des tests de pénétration complets et une évaluation des vulnérabilités. J\'ai livré plus de 50 sites web et applications professionnels avec 100% de satisfaction client.',
            'about.cta': 'Travaillons ensemble',
            
            // Expertise Section
            'expertise.title': 'Domaines d\'expertise',
            'expertise.subtitle': 'Compétences complètes en cybersécurité et marchés financiers',
            'expertise.cybersecurity.title': 'Cybersécurité et piratage éthique',
            'expertise.cybersecurity.description': 'Solutions complètes de cybersécurité incluant des tests de pénétration professionnels, une évaluation des vulnérabilités, un piratage éthique et une conception d\'architecture sécurisée pour les clients d\'entreprise.',
            'expertise.cybersecurity.level': 'Niveau expert',
            'expertise.financial.title': 'Analyse financière',
            'expertise.financial.description': 'Analyse avancée du marché et stratégies de trading algorithmique pour le forex, la crypto et les marchés traditionnels.',
            'expertise.financial.level': 'Niveau avancé',
            'expertise.web.title': 'Développement web professionnel',
            'expertise.web.description': 'Développement web full-stack axé sur les applications sécurisées et évolutives, les plateformes de commerce électronique et les technologies web modernes. Livraison de sites web à fort impact en 7 jours.',
            'expertise.web.level': 'Niveau compétent',
            
            // Projects Section
            'projects.title': 'Projets en vedette',
            'projects.subtitle': 'Présentation de mes meilleurs travaux en sécurité, finance et développement',
            'projects.web.category': 'Développement web',
            'projects.web.title': 'Développement de sites web',
            'projects.web.description': 'Une plateforme complète pour gérer et développer des sites web pour les particuliers et les entreprises. Construit avec des pratiques de développement web sécurisées et des principes de piratage éthique.',
            
            'projects.security.category': 'Cybersécurité',
            'projects.security.title': 'Framework professionnel de tests de pénétration',
            'projects.security.description': 'Plateforme de tests de sécurité automatisée avec analyse complète des vulnérabilités, outils de piratage éthique et rapports de sécurité détaillés pour les clients d\'entreprise.',
            'projects.cta': 'Lancez votre site web professionnel aujourd\'hui',
            
            // Sites Page
            'sitesHeading': 'Excellence en développement web d\'entreprise et en ingénierie logicielle',
            'sitesIntro1': 'Bienvenue dans mon portfolio de développement web professionnel, présentant des solutions de niveau entreprise et des projets d\'ingénierie logicielle modernes. Chaque projet représente un engagement envers l\'excellence, l\'innovation et les meilleures pratiques de l\'industrie.',
            'sitesIntro2': 'Des plateformes de commerce électronique évolutives aux systèmes éducatifs sophistiqués, ces projets démontrent mon expertise dans la création d\'applications robustes centrées sur l\'utilisateur qui génèrent de la valeur commerciale et offrent des expériences utilisateur exceptionnelles.',
            'site1Title': 'Plateforme de commerce électronique d\'entreprise',
            'site1Desc': 'Obtenez un site web de commerce électronique professionnel avec toutes les fonctionnalités modernes et professionnelles pour devenir un commerçant de commerce électronique réussi et augmenter vos ventes.',
            'site3Title': 'Plateforme d\'apprentissage éducative',
            'site3Desc': 'Création d\'une plateforme éducative complète avec des modules d\'apprentissage interactifs, un suivi des progrès et une gestion complète des cours. Comprend des parcours d\'apprentissage adaptatifs et des analyses de performance.',
            'site4Title': 'Site web de société de services',
            'site4Desc': 'Développement d\'un site web professionnel de société de services avec un design moderne, des témoignages de clients, une présentation de services et des formulaires de contact. Comprend un design réactif et une optimisation SEO.',
            'site5Title': 'Site web de portfolio professionnel',
            'site5Desc': 'Conception et développement d\'un site web de portfolio moderne avec des animations avancées, des performances optimales et une présentation professionnelle. Comprend des transitions fluides et des éléments interactifs.',
            'site6Title': 'Portfolio Mohamed Riadh',
            'site6Desc': 'Bien sûr 😅 En tant que programmeur, c\'est moi qui ai programmé et développé mon site web de portfolio',
            'viewLiveSite': 'Voir le site en direct',
            'viewCode': 'Tous les sites',
            'footerText': '© 2025 Mohamed Riadh. Tous droits réservés.',
            
            // Contact Section
            'contact.intro': 'Dites-nous votre idée et obtenez un plan détaillé et un devis en 24 heures.',
            'contact.title': 'Lançons votre projet en 7 jours',
            'contact.subtitle': 'Donnons vie à votre vision. Qu\'il s\'agisse de sécuriser des systèmes par des tests de pénétration professionnels, de développer des sites web à fort impact avec des pratiques de codage sécurisées ou de mettre en œuvre des solutions complètes de cybersécurité, je suis prêt à fournir l\'excellence.',
            'contact.email': 'Email',
            'contact.phone': 'Téléphone',
            'contact.location': 'Localisation',
            'contact.location.text': 'Algérie, Disponible mondialement',
            
            // Footer
            'footer.brand': 'Mohamed Riadh',
            'footer.tagline': 'Sécuriser les futurs numériques grâce à l\'innovation et l\'expertise',
            'footer.services.title': 'Services',
            'footer.services.security': 'Conseil en cybersécurité et tests de pénétration',
            'footer.services.web': 'Développement web professionnel',
            'footer.services.analysis': 'Analyse des marchés financiers',
            'footer.services.testing': 'Piratage éthique et tests de sécurité',
            'footer.resources.title': 'Ressources',
            'footer.resources.blog': 'Blog',
            'footer.resources.about': 'À propos',
            'footer.resources.contact': 'Contact',
            'footer.resources.portfolio': 'Portfolio',
            'footer.connect.title': 'Connecter',
            'footer.copyright': '© 2025 Mohamed Riadh. Tous droits réservés.',
            
            // Start Website Section
            'start-website.title': 'Prêt à lancer votre site web ?',
            'start-website.subtitle': 'Transformons votre vision en une présence en ligne puissante et sécurisée qui génère des résultats et protège votre entreprise.',
            'start-website.button': 'Obtenez votre site web à fort impact aujourd\'hui',
            
            // Chatbot
            'chatbot.tooltip': 'Discuter avec l\'assistant IA',
            
            // Navigation Help
            'nav.help.title': 'Navigation Rapide',
            'nav.help.sections': 'Appuyez sur 1-6 pour sauter aux sections',
            'nav.help.navigation': 'Appuyez sur Home / End pour haut/bas',
            
            // Loading
            'loading.text': 'Chargement du portfolio...'
        }
    };

    // Translation Manager Class
    class TranslationManager {
        constructor() {
            this.currentLanguage = localStorage.getItem('language') || 'en';
            this.init();
        }

        init() {
            // Apply translations on page load
            this.applyTranslations(this.currentLanguage);
            
            // Listen for language changes
            window.addEventListener('languageChanged', (e) => {
                this.applyTranslations(e.detail.language);
            });
        }

        applyTranslations(lang) {
            const translationData = translations[lang] || translations.en;
            
            // Apply translations to all elements with data-translate attribute
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                if (translationData[key]) {
                    // Handle different element types
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.placeholder = translationData[key];
                    } else {
                        element.textContent = translationData[key];
                    }
                }
            });

            // Apply RTL/LTR direction for Arabic
            if (lang === 'ar') {
                document.documentElement.setAttribute('dir', 'rtl');
                document.body.classList.add('rtl');
            } else {
                document.documentElement.setAttribute('dir', 'ltr');
                document.body.classList.remove('rtl');
            }

            // Store current language
            this.currentLanguage = lang;
            localStorage.setItem('language', lang);
        }

        getTranslation(key) {
            const translationData = translations[this.currentLanguage] || translations.en;
            return translationData[key] || key;
        }
    }

    // Initialize Translation Manager
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.translationManager = new TranslationManager();
        });
    } else {
        window.translationManager = new TranslationManager();
    }

})();

