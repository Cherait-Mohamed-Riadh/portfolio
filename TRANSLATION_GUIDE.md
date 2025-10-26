# Translation System Guide

## نظام الترجمة المحسّن

تم تحسين نظام الترجمة في الموقع ليعمل بشكل تلقائي على جميع الصفحات.

## كيفية الاستخدام

### 1. إضافة نص قابل للترجمة

لجعل أي نص قابلاً للترجمة، أضف attribute `data-translate` مع مفتاح الترجمة:

```html
<h1 data-translate="hero.title.line2">Mohamed Riadh</h1>
<p data-translate="hero.description">Description text here...</p>
```

### 2. إضافة ترجمة جديدة

افتح ملف `js/translations.js` وأضف الترجمة في كل لغة:

```javascript
const translations = {
    en: {
        'your.key.here': 'English text',
        // ...
    },
    ar: {
        'your.key.here': 'النص بالعربية',
        // ...
    },
    fr: {
        'your.key.here': 'Texte en français',
        // ...
    }
};
```

### 3. الترجمة التلقائية

عند تغيير اللغة من القائمة المنسدلة:
- يتم تطبيق جميع الترجمات تلقائياً
- يتم تغيير اتجاه النص (RTL للعربية، LTR للإنجليزية والفرنسية)
- يتم حفظ اختيار اللغة في LocalStorage

## الميزات

### ✅ دعم ثلاث لغات
- English (en)
- العربية (ar)
- Français (fr)

### ✅ دعم RTL كامل
- اتجاه نص تلقائي للعربية
- تخطيط متجاوب مع RTL
- أيقونات ومحتوى متوافق

### ✅ حفظ تلقائي
- يتم حفظ اللغة المختارة في المتصفح
- تطبيق اللغة المحفوظة عند زيارة الموقع

## الملفات المتضمنة

- `js/translations.js` - نظام الترجمة الأساسي
- `css/rtl.css` - تنسيقات RTL للعربية
- `js/main.js` - مدير اللغة الرئيسي

## كيفية إضافة صفحة جديدة

لإضافة دعم الترجمة لصفحة جديدة:

1. أضف ملف الترجمة:
```html
<script src="js/translations.js" defer></script>
```

2. أضف ملف RTL CSS:
```html
<link rel="stylesheet" href="css/rtl.css">
```

3. أضف `data-translate` attributes لجميع النصوص:
```html
<h1 data-translate="page.title">Page Title</h1>
```

4. أضف الترجمات في `js/translations.js`:
```javascript
'page.title': 'Page Title', // English
'page.title': 'عنوان الصفحة', // Arabic
'page.title': 'Titre de la page', // French
```

## ملاحظات مهمة

- استخدم مفاتيح واضحة ومنظمة (مثل: `section.element.property`)
- تأكد من إضافة الترجمة في جميع اللغات الثلاث
- اختبر الصفحة في كل لغة للتأكد من صحة الترجمة
- تحقق من التخطيط في وضع RTL للعربية

## مثال عملي

```html
<!-- Before (Static Text) -->
<h1>Mohamed Riadh</h1>
<p>Cybersecurity Expert</p>

<!-- After (Translatable) -->
<h1 data-translate="hero.title.line2">Mohamed Riadh</h1>
<p data-translate="hero.badge">Cybersecurity Expert</p>
```

```javascript
// في js/translations.js
const translations = {
    en: {
        'hero.title.line2': 'Mohamed Riadh',
        'hero.badge': 'Cybersecurity Expert'
    },
    ar: {
        'hero.title.line2': 'محمد رياض',
        'hero.badge': 'خبير الأمن السيبراني'
    },
    fr: {
        'hero.title.line2': 'Mohamed Riadh',
        'hero.badge': 'Expert en Cybersécurité'
    }
};
```

## الدعم الفني

إذا واجهت أي مشاكل مع نظام الترجمة:
1. تحقق من console المتصفح للأخطاء
2. تأكد من وجود `data-translate` attribute
3. تحقق من وجود الترجمة في `js/translations.js`
4. تأكد من تحميل الملفات بالترتيب الصحيح

---

© 2025 Mohamed Riadh. جميع الحقوق محفوظة.

