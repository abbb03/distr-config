# Distr-Config

Тестовое задание на GoCloudCamp

## Примеры использования

### Создание конфига:

Запрос:  
`curl -d "@data.json" -H "Content-Type: application/json" -X POST http://localhost:8080/config/`

Ответ:
```json
{
    "service": "myservice",
    "data": [
        {"key1": "value1"},
        {"key2": "value2"}
    ]
}
```

### Получение конфига:

#### 1. Без указания версии

Запрос:  
`curl http://localhost:8080/config/?service=myservice`

Ответ:
```json
{
    {"key1": "value1"},
    {"key2": "value2"},
    {"key3": "value3"}
}
```

#### 2. С указанием версии

Запрос:  
`curl http://localhost:8080/config/?service=myservice&v=1`

Ответ:
```json
{
    {"key1": "value1"},
    {"key2": "value2"}
}
```

### Обновление конфига:

Запрос:  
`curl -d "@test.json" -H "Content-Type: application/json" -X PATCH http://localhost:8080/config/`

Ответ:
```json
{
    "service": "myservice",
    "data": [
        {"key1": "value1"},
        {"key2": "value2"}
    ]
}
```

### Удаление конфига:

Запрос:  
`curl -X DELETE http://localhost:8080/config/?service=myservice`

Ответ:
```json
{
    "service": "myservice",
    "data": [
        {"key1": "value1"},
        {"key2": "value2"}
    ]
}
```
