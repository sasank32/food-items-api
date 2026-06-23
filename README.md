# Food Items API

## Run locally

```bash
npm install
npm start
```

Base URL:

```text
http://localhost:3000
```

## Endpoints

```http
GET /api/foods
GET /api/foods/FOOD-0001
GET /api/foods/search?query=paneer
GET /api/foods/category/Lunch
```

## Salesforce mapping

```text
id           -> Product2.Food_External_Id__c
name         -> Product2.Name
productCode  -> Product2.ProductCode
category     -> Product2.Family / Food_Category__c
priceINR     -> PricebookEntry.UnitPrice
imageUrl     -> Product2.Image_URL__c
calories     -> Product2.Calories__c
proteinG     -> Product2.Protein__c
carbsG       -> Product2.Carbs__c
fatG         -> Product2.Fat__c
```
