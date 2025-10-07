#include<iostream>
#include<vector>
#include<deque>
#include<list>
#include<set>
#include<map>
#include<string>
#include<ctime>
#include<unordered_set>
#include<unordered_map>
using namespace std;
struct Product{
    int ProductID;
    string ProductName;
    double Price;
    int stockQuantity;
    string Category;



};
struct  Order{
    int orderID;
    int ProductID;
    string CustomerID;
    time_t orderDate;
    int quantity;
};


int main(){
    vector<Product> products = {
        {1, "Laptop", 999.99, 10,"Electronics"},
        {2, "Smartphone", 499.99, 20,"ELectronics"},
        {3, "Headphones", 199.99, 15,"Electronics"},
        {4, "Book", 29.99, 50,"Books"},
        {5, "Desk Chair", 89.99, 5,"Furniture"}
    };
    deque<string> recentCustomers = 
    { "C001", "Bob","C002"};
    recentCustomers.push_back("Preet");
    recentCustomers.push_front("Chauhan");

    list<Order> orderHistory;
    orderHistory.push_back(
        {101, 1,"C001",time(0),1}
    );
    orderHistory.push_back(
        {102,2,"C002",time(0),1}
    );
    
set<string> Categories;
for(const auto &product: products){
    Categories.insert(products.Category);
}
map<int,int> productStock = {
    {1,10},
    {2,20},
    {3,15},
    {4,50},
    {5,5}
}
multimap<string, Order> customerOrders;
for(const auto &order : orderHistory){
    customerOrders.insert({
        order.customerID, order
    });
}
unordered_map<string,string> customerData = {
    {"C001","Preet"},
    {"C002","Chauhan"},
    {"C003","Bob"}
};
unordered_set<int> uniqueProductIDs;
uniqueProductIDs.insert(products.productID);
    return 0;
}





