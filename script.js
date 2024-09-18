// عند الضغط على زر "استكشاف المزيد"، سينقلك إلى صفحة الخدمات
document.querySelector("button").addEventListener("click", function() {
    window.location.href = "#الخدمات";
});
// الحصول على النموذج وعناصر الإدخال
const jobForm = document.getElementById('jobForm');
const jobList = document.getElementById('jobList');

// التعامل مع إضافة الوظيفة
jobForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // الحصول على بيانات المدخلات
    const companyName = document.getElementById('companyName').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;

    // إنشاء عنصر جديد لعرض الوظيفة
    const jobItem = document.createElement('li');
    jobItem.innerHTML = `
        <strong>اسم الشركة:</strong> ${companyName} <br>
        <strong>المسمى الوظيفي:</strong> ${jobTitle} <br>
        <strong>الموقع:</strong> ${location} <br>
        <strong>الوصف:</strong> ${description} <br>
        <hr>
    `;

    // إضافة الوظيفة الجديدة إلى قائمة الوظائف
    jobList.appendChild(jobItem);

    // إعادة تعيين المدخلات
    jobForm.reset();
});
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>وظائف</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js"></script>
</head>
<body>
    <header>
        <div class="logo">
            <h1>ماستر بريستا عصام أبو اليزيد - وظائف</h1>
        </div>
        <nav>
            <ul>
                <li><a href="index.html">الرئيسية</a></li>
                <li><a href="#">الوظائف</a></li>
                <li><a href="training.html">تدريب</a></li>
            </ul>
        </nav>
    </header>

    <section class="section">
        <h2>أحدث الوظائف المتاحة</h2>
        <p>هنا يمكنك الاطلاع على أحدث فرص العمل في مجال الباريستا.</p>

        <!-- خانة إضافة وظيفة جديدة -->
        <div class="job-form">
            <h3>أضف وظيفة جديدة</h3>
            <form id="jobForm">
                <label for="companyName">اسم الشركة:</label>
                <input type="text" id="companyName" name="companyName" required><br>

                <label for="jobTitle">المسمى الوظيفي:</label>
                <input type="text" id="jobTitle" name="jobTitle" required><br>

                <label for="location">الموقع:</label>
                <input type="text" id="location" name="location" required><br>

                <label for="description">وصف الوظيفة:</label>
                <textarea id="description" name="description" required></textarea><br>

                <button type="submit">إضافة الوظيفة</button>
            </form>
        </div>

        <!-- مكان عرض الوظائف المضافة -->
        <div class="job-list">
            <h3>الوظائف المتاحة</h3>
            <ul id="jobList">
                <!-- ستظهر الوظائف هنا بعد الإضافة -->
            </ul>
        </div>
    </section>

    <footer>
        <p>&copy; 2024 ماستر بريستا عصام أبو اليزيد. جميع الحقوق محفوظة.</p>
    </footer>

    <script>
        // إعداد Firebase
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
            databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_PROJECT_ID.appspot.com",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID"
        };

        firebase.initializeApp(firebaseConfig);
        const database = firebase.database();

        // التعامل مع النموذج
        document.getElementById('jobForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const companyName = document.getElementById('companyName').value;
            const jobTitle = document.getElementById('jobTitle').value;
            const location = document.getElementById('location').value;
            const description = document.getElementById('description').value;

            database.ref('jobs').push({
                companyName: companyName,
                jobTitle: jobTitle,
                location: location,
                description: description
            });

            // تنظيف النموذج
            document.getElementById('jobForm').reset();
        });

        // عرض الوظائف
        database.ref('jobs').on('value', function(snapshot) {
            const jobList = document.getElementById('jobList');
            jobList.innerHTML = '';

            snapshot.forEach(function(childSnapshot) {
                const job = childSnapshot.val();
                const li = document.createElement('li');
                li.innerHTML = `<strong>${job.companyName}</strong><p><b>${job.jobTitle}</b><br>الموقع: ${job.location}<br>${job.description}</p>`;
                jobList.appendChild(li);
            });
        });
    </script>
</body>
</html>
