<?php
session_start();

// Проверяем авторизацию (в реальном приложении)
$isLoggedIn = true; // Заглушка
$userData = [
    'username' => 'TestUser',
    'email' => 'test@example.com',
    'phone' => '+7 (999) 123-45-67',
    'city' => 'Москва',
    'age' => 25,
    'gender' => 'male',
    'about' => 'Информация о себе...',
    'interests' => 'Музыка, спорт, путешествия'
];

$isEditing = false;
$message = '';

// Обработка POST запросов
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'edit':
                $isEditing = true;
                break;
            case 'save':
                // Здесь должна быть логика сохранения в базу данных
                $userData['username'] = htmlspecialchars($_POST['username'] ?? $userData['username']);
                $userData['email'] = htmlspecialchars($_POST['email'] ?? $userData['email']);
                $userData['phone'] = htmlspecialchars($_POST['phone'] ?? $userData['phone']);
                $userData['city'] = htmlspecialchars($_POST['city'] ?? $userData['city']);
                $userData['age'] = intval($_POST['age'] ?? $userData['age']);
                $userData['gender'] = htmlspecialchars($_POST['gender'] ?? $userData['gender']);
                $userData['about'] = htmlspecialchars($_POST['about'] ?? $userData['about']);
                $userData['interests'] = htmlspecialchars($_POST['interests'] ?? $userData['interests']);
                
                $message = 'Профиль успешно сохранен!';
                $isEditing = false;
                break;
            case 'cancel':
                $isEditing = false;
                break;
        }
    }
}

// Если передан параметр edit в URL
if (isset($_GET['edit']) && $_GET['edit'] === '1') {
    $isEditing = true;
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>МурК - Моя анкета</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #87CEEB;
            min-height: 100vh;
        }
        
        .header {
            background-color: #FFA500;
            color: white;
            text-align: center;
            padding: 15px 0;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 0;
        }
        
        .breadcrumb {
            background-color: #f8f9fa;
            padding: 8px 20px;
            font-size: 12px;
            color: #666;
            border-bottom: 1px solid #ddd;
        }
        
        .breadcrumb a {
            color: #007bff;
            text-decoration: none;
        }
        
        .breadcrumb a:hover {
            text-decoration: underline;
        }
        
        .container {
            max-width: 800px;
            margin: 20px auto;
            background-color: white;
            padding: 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .content {
            padding: 30px;
        }
        
        .page-title {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .section {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        
        .section:last-child {
            border-bottom: none;
        }
        
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-bottom: 15px;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555;
        }
        
        .form-input {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ddd;
            font-size: 14px;
            box-sizing: border-box;
        }
        
        .form-select {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ddd;
            font-size: 14px;
            box-sizing: border-box;
            background-color: white;
        }
        
        .form-textarea {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ddd;
            font-size: 14px;
            box-sizing: border-box;
            resize: vertical;
            min-height: 80px;
        }
        
        .btn {
            padding: 8px 20px;
            border: 1px solid #ddd;
            background-color: #f8f9fa;
            color: #333;
            cursor: pointer;
            font-size: 14px;
            margin-right: 10px;
            text-decoration: none;
            display: inline-block;
        }
        
        .btn:hover {
            background-color: #e9ecef;
        }
        
        .btn-primary {
            background-color: #007bff;
            color: white;
            border-color: #007bff;
        }
        
        .btn-primary:hover {
            background-color: #0056b3;
        }
        
        .btn-success {
            background-color: #28a745;
            color: white;
            border-color: #28a745;
        }
        
        .btn-success:hover {
            background-color: #1e7e34;
        }
        
        .info-text {
            color: #666;
            font-size: 13px;
            margin-top: 5px;
        }
        
        .message {
            padding: 10px;
            margin-bottom: 20px;
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            border-radius: 4px;
        }
        
        .footer {
            background-color: #FFA500;
            color: white;
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            margin-top: 40px;
        }
        
        .photo-section {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .profile-photo {
            width: 150px;
            height: 150px;
            border: 2px solid #ddd;
            margin: 0 auto 15px;
            display: block;
            object-fit: cover;
        }
        
        .two-column {
            display: flex;
            gap: 20px;
        }
        
        .two-column .form-group {
            flex: 1;
        }
        
        @media (max-width: 600px) {
            .two-column {
                flex-direction: column;
            }
            
            .container {
                margin: 10px;
            }
            
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        МурК
    </div>
    
    <!-- Breadcrumb -->
    <div class="breadcrumb">
        <a href="/">Клуб</a> | Моя анкета
    </div>
    
    <!-- Main Container -->
    <div class="container">
        <div class="content">
            <h1 class="page-title">Моя анкета</h1>
            
            <?php if ($message): ?>
                <div class="message"><?php echo $message; ?></div>
            <?php endif; ?>
            
            <form method="POST" enctype="multipart/form-data">
                <!-- Section 1: Основная информация -->
                <div class="section">
                    <div class="section-title">1. Основная информация</div>
                    
                    <div class="photo-section">
                        <img src="/images/male-user-icon.png" alt="Фото профиля" class="profile-photo">
                        <?php if ($isEditing): ?>
                            <input type="file" name="photo" accept="image/*" class="form-input">
                            <div class="info-text">Загрузите фотографию (JPG, PNG, максимум 5MB)</div>
                        <?php endif; ?>
                    </div>
                    
                    <div class="two-column">
                        <div class="form-group">
                            <label class="form-label">Имя пользователя:</label>
                            <?php if ($isEditing): ?>
                                <input type="text" name="username" value="<?php echo htmlspecialchars($userData['username']); ?>" class="form-input" required>
                            <?php else: ?>
                                <div class="form-input" style="background-color: #f8f9fa;"><?php echo htmlspecialchars($userData['username']); ?></div>
                            <?php endif; ?>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Возраст:</label>
                            <?php if ($isEditing): ?>
                                <input type="number" name="age" value="<?php echo $userData['age']; ?>" class="form-input" min="18" max="100">
                            <?php else: ?>
                                <div class="form-input" style="background-color: #f8f9fa;"><?php echo $userData['age']; ?> лет</div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
                
                <!-- Section 2: Контактная информация -->
                <div class="section">
                    <div class="section-title">2. Контактная информация</div>
                    
                    <div class="form-group">
                        <label class="form-label">Email:</label>
                        <?php if ($isEditing): ?>
                            <input type="email" name="email" value="<?php echo htmlspecialchars($userData['email']); ?>" class="form-input" required>
                        <?php else: ?>
                            <div class="form-input" style="background-color: #f8f9fa;"><?php echo htmlspecialchars($userData['email']); ?></div>
                        <?php endif; ?>
                    </div>
                    
                    <div class="two-column">
                        <div class="form-group">
                            <label class="form-label">Телефон:</label>
                            <?php if ($isEditing): ?>
                                <input type="tel" name="phone" value="<?php echo htmlspecialchars($userData['phone']); ?>" class="form-input">
                            <?php else: ?>
                                <div class="form-input" style="background-color: #f8f9fa;"><?php echo htmlspecialchars($userData['phone']); ?></div>
                            <?php endif; ?>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label">Город:</label>
                            <?php if ($isEditing): ?>
                                <input type="text" name="city" value="<?php echo htmlspecialchars($userData['city']); ?>" class="form-input">
                            <?php else: ?>
                                <div class="form-input" style="background-color: #f8f9fa;"><?php echo htmlspecialchars($userData['city']); ?></div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
                
                <!-- Section 3: Личная информация -->
                <div class="section">
                    <div class="section-title">3. Личная информация</div>
                    
                    <div class="form-group">
                        <label class="form-label">Пол:</label>
                        <?php if ($isEditing): ?>
                            <select name="gender" class="form-select">
                                <option value="male" <?php echo $userData['gender'] === 'male' ? 'selected' : ''; ?>>Мужской</option>
                                <option value="female" <?php echo $userData['gender'] === 'female' ? 'selected' : ''; ?>>Женский</option>
                            </select>
                        <?php else: ?>
                            <div class="form-input" style="background-color: #f8f9fa;">
                                <?php echo $userData['gender'] === 'male' ? 'Мужской' : 'Женский'; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">О себе:</label>
                        <?php if ($isEditing): ?>
                            <textarea name="about" class="form-textarea" placeholder="Расскажите о себе..."><?php echo htmlspecialchars($userData['about']); ?></textarea>
                        <?php else: ?>
                            <div class="form-input" style="background-color: #f8f9fa; min-height: 80px; padding: 12px;">
                                <?php echo nl2br(htmlspecialchars($userData['about'])); ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
                
                <!-- Section 4: Интересы -->
                <div class="section">
                    <div class="section-title">4. Интересы и увлечения</div>
                    
                    <div class="form-group">
                        <label class="form-label">Интересы:</label>
                        <?php if ($isEditing): ?>
                            <textarea name="interests" class="form-textarea" placeholder="Ваши интересы и увлечения..."><?php echo htmlspecialchars($userData['interests']); ?></textarea>
                            <div class="info-text">Укажите ваши интересы, хобби, любимые занятия</div>
                        <?php else: ?>
                            <div class="form-input" style="background-color: #f8f9fa; min-height: 80px; padding: 12px;">
                                <?php echo nl2br(htmlspecialchars($userData['interests'])); ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
                
                <!-- Action Buttons -->
                <div style="text-align: center; margin-top: 30px;">
                    <?php if ($isEditing): ?>
                        <button type="submit" name="action" value="save" class="btn btn-success">Сохранить изменения</button>
                        <button type="submit" name="action" value="cancel" class="btn">Отменить</button>
                    <?php else: ?>
                        <button type="submit" name="action" value="edit" class="btn btn-primary">Редактировать профиль</button>
                        <a href="/" class="btn">Вернуться в чат</a>
                    <?php endif; ?>
                </div>
            </form>
        </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
        © 2008-2024 МурК - все права защищены
    </div>
</body>
</html>
