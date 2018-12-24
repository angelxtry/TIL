# DataTable

## Table 생성, column 추가

DataSet이란게 있나보다. 얼마전에 첨 알았다.
데이터 베이스를 메모리 내에 만드는 듯 하다.
DataSet에 여러 개의 DataTable이 추가될 수 있다.
DataTable은 말 그대로 Table 구조를 가지고 있다.

```cs
private void MakeParentTable()
{
    DataTable table = new DataTable("ParentTable");
    DataColumn column;
    DataRow row;

    column = new DataColumn();
    column.DataType = System.Type.GetType("System.Int32");
    column.ColumnName = "id";
    column.ReadOnly = true;
    column.Unique = true;
    table.Columns.Add(column);

    column = new DataColumn();
    column.DataType = System.Type.GetType("System.String");
    column.ColumnName = "ParentItem";
    column.AutoIncrement = false;
    column.Caption = "ParentItem";
    column.ReadOnly = false;
    column.Unique = false;
    table.Columns.Add(column);

    DataColumn[] PrimaryKeyColumns = new DataColumn[1];
    PrimaryKeyColumns[0] = table.Columns["id"];
    table.PrimaryKey = PrimaryKeyColumns;

    dataSet = new DataSet();
    dataSet.Tables.Add(table);

    for (int i = 0; i <= 2; i++)
    {
        row = table.NewRow();
        row["id"] = i;
        row["ParentItem"] = "ParentItem " + i;
        table.Rows.Add(row);
    }
}
```

위의 코드처럼 column의 type, name, 속성 등을 정의하여 DataTable의 column 속성을 추가한다.
Primary Key도 지정할 수 있다.
DataRow를 만들고 미리 지정한 DataColumn의 속성에 맞게 DataRow의 값을 설정한 후 DataTable.Rows.Add 메서드를 이용하여 DataTable에 추가한다.

```cs
static void Main(string[] args)
{
    DataTable orderTable = CreateOrderTable();
    DataTable orderDetailTable = CreateOrderDetailTable();
    DataSet salesSet = new DataSet();
    salesSet.Tables.Add(orderTable);
    salesSet.Tables.Add(orderDetailTable);

    salesSet.Relations.Add(
        "OrderOrderDetail",
        orderTable.Columns["OrderId"],
        orderDetailTable.Columns["OrderId"],
        true);
    Console.WriteLine("After creating the foreign key constraint, \n" +
        "you will see the following error if inserting order detail \n" +
        "with the wrong OrderId: ");
    try
    {
        DataRow errorRow = orderDetailTable.NewRow();
        errorRow[0] = 1;
        errorRow[1] = "O0007";
        orderDetailTable.Rows.Add(errorRow);
    }
    catch (Exception e)
    {
        Console.WriteLine(e.Message);
    }
    Console.WriteLine();

    InsertOrders(orderTable);
    InsertOrderDetails(orderDetailTable);

    Console.WriteLine("The initial Order table.");
    ShowTable(orderTable);

    Console.WriteLine("The OrderDetail table.");
    ShowTable(orderDetailTable);

    DataColumn colSub = new DataColumn("SubTotal", typeof(Decimal), "Sum(Child.LineTotal)");
    orderTable.Columns.Add(colSub);
    DataColumn colTax = new DataColumn("Tax", typeof(Decimal), "SubTotal*0.5");
    orderTable.Columns.Add(colTax);
    DataColumn colTotal = new DataColumn("TotalDue", typeof(Decimal),
        "IIF(OrderId='Total',Sum(SubTotal)+Sum(Tax),SubTotal+Tax)");
    orderTable.Columns.Add(colTotal);

    DataRow row = orderTable.NewRow();
    row["OrderId"] = "Total";
    orderTable.Rows.Add(row);

    Console.WriteLine("The Order table with the expression columns.");
    ShowTable(orderTable);

    Console.WriteLine("Press any key to exit.");
    Console.ReadLine();
}

private static void ShowTable(DataTable table)
{
    foreach (DataColumn col in table.Columns)
    {
        Console.Write("{0, -14}", col.ColumnName);
    }
    Console.WriteLine();

    foreach (DataRow row in table.Rows)
    {
        foreach (DataColumn col in table.Columns)
        {
            if (col.DataType.Equals(typeof(DateTime)))
                Console.Write("{0, -14:d}", row[col]);
            else if (col.DataType.Equals(typeof(Decimal)))
                Console.Write("{0, -14:C}", row[col]);
            else
                Console.Write("{0, -14}", row[col]);
        }
        Console.WriteLine();
    }
    Console.WriteLine();
}

private static void InsertOrders(DataTable orderTable)
{
    DataRow row1 = orderTable.NewRow();
    row1["OrderId"] = "O0001";
    row1["OrderDate"] = new DateTime(2018, 12, 01);
    orderTable.Rows.Add(row1);

    DataRow row2 = orderTable.NewRow();
    row2["OrderId"] = "O0002";
    row2["OrderDate"] = new DateTime(2018, 12, 12);
    orderTable.Rows.Add(row2);

    DataRow row3 = orderTable.NewRow();
    row3["OrderId"] = "O0003";
    row3["OrderDate"] = new DateTime(2018, 12, 20);
    orderTable.Rows.Add(row3);
}

private static void InsertOrderDetails(DataTable orderDetailTable)
{
    Object[] rows = {
                        new Object[]{1, "O0001", "Mountain Bike", 1419.5, 36},
                        new Object[]{2, "O0001", "Rode Bike", 1233.6, 16},
                        new Object[]{3, "O0001", "Touring Bike", 1563.3, 32},
                        new Object[]{4, "O0002", "Mountain Bike", 1419.5, 24},
                        new Object[]{5, "O0002", "Road Bike", 1233.6, 12},
                        new Object[]{6, "O0003", "Mountain Bike", 1419.5, 48},
                        new Object[]{7, "O0003", "Touring Bike", 1653.3, 8},
                    };
    foreach (Object[] row in rows)
    {
        orderDetailTable.Rows.Add(row);
    }
}

private static DataTable CreateOrderTable()
{
    DataTable orderTable = new DataTable("Order");
    DataColumn colId = new DataColumn("OrderId", typeof(string));
    orderTable.Columns.Add(colId);
    DataColumn colDate = new DataColumn("OrderDate", typeof(DateTime));
    orderTable.Columns.Add(colDate);
    orderTable.PrimaryKey = new DataColumn[] { colId };
    return orderTable;
}

private static DataTable CreateOrderDetailTable()
{
    DataTable orderDetailTable = new DataTable("OrderDetail");
    DataColumn[] cols = {
                            new DataColumn("OrderDetailId", typeof(Int32)),
                            new DataColumn("OrderId", typeof(String)),
                            new DataColumn("Product", typeof(String)),
                            new DataColumn("UnitPrice", typeof(Decimal)),
                            new DataColumn("OrderQty", typeof(Int32)),
                            new DataColumn("LineTotal", typeof(Decimal), "UnitPrice*OrderQty"),
                        };
    orderDetailTable.Columns.AddRange(cols);
    orderDetailTable.PrimaryKey = new DataColumn[] { orderDetailTable.Columns["OrderDetailId"] };
    return orderDetailTable;
}
```

이 코드를 부분으로 나누어 살펴보자.

```cs
private static DataTable CreateOrderTable()
{
    DataTable orderTable = new DataTable("Order");
    DataColumn colId = new DataColumn("OrderId", typeof(string));
    orderTable.Columns.Add(colId);
    DataColumn colDate = new DataColumn("OrderDate", typeof(DateTime));
    orderTable.Columns.Add(colDate);
    orderTable.PrimaryKey = new DataColumn[] { colId };
    return orderTable;
}

private static DataTable CreateOrderDetailTable()
{
    DataTable orderDetailTable = new DataTable("OrderDetail");
    DataColumn[] cols = {
                            new DataColumn("OrderDetailId", typeof(Int32)),
                            new DataColumn("OrderId", typeof(String)),
                            new DataColumn("Product", typeof(String)),
                            new DataColumn("UnitPrice", typeof(Decimal)),
                            new DataColumn("OrderQty", typeof(Int32)),
                            new DataColumn("LineTotal", typeof(Decimal), "UnitPrice*OrderQty"),
                        };
    orderDetailTable.Columns.AddRange(cols);
    orderDetailTable.PrimaryKey = new DataColumn[] { orderDetailTable.Columns["OrderDetailId"] };
    return orderDetailTable;
}
```

보통은 간소화해서 이 정도로 column과 row를 설정하여 저장한다.
PrimaryKey를 설정할 때 DataColumn 배열을 사용한다.
다수의 column을 한 번에 설정할 때도 DataColumn 배열을 사용한다.
특이한 점은 LineTotal columns을 설정할 때 3번째 argument를 string으로 전달하지만 실제로 수식처럼 사용된다.
이것은 DataColumn.Expression Property라고 불린다.

```cs
DataSet.Tables("OrderDetail").Column("LineTotal").Expression = "UnitPrice * OrderQty";
```

위와 같은 코드로 동일하게 설정할 수 있다.

Sum, Avg, Min, Max, Count 같은 집계함수도 사용할 수 있다.
Convert, Len, IsNull, Trim, SubString 등의 함수도 사용할 수 있다.
IIF(expr, truepart, falsepart) 같은 특이한 함수도 사용할 수 있다.

```cs
DataTable orderTable = CreateOrderTable();
DataTable orderDetailTable = CreateOrderDetailTable();
DataSet salesSet = new DataSet();
salesSet.Tables.Add(orderTable);
salesSet.Tables.Add(orderDetailTable);

salesSet.Relations.Add(
    "OrderOrderDetail",
    orderTable.Columns["OrderId"],
    orderDetailTable.Columns["OrderId"],
    true);
Console.WriteLine("After creating the foreign key constraint, \n" +
    "you will see the following error if inserting order detail \n" +
    "with the wrong OrderId: ");
try
{
    DataRow errorRow = orderDetailTable.NewRow();
    errorRow[0] = 1;
    errorRow[1] = "O0007";
    orderDetailTable.Rows.Add(errorRow);
}
catch (Exception e)
{
    Console.WriteLine(e.Message);
}
```

DataTable 2개를 생성하여 DataSet에 추가하고 두 테이블 간의 Relations을 만들었다.
OrderOrderDetail이라고 이름을 붙이고 각 table의 column을 지정하고 createConstraints를 true로 설정했다.
parent table에 Relation이 걸린 column에 데이터가 없다면 child table에 column을 추가할 수 없다.

```cs
private static void InsertOrderDetails(DataTable orderDetailTable)
{
    Object[] rows = {
                        new Object[]{1, "O0001", "Mountain Bike", 1419.5, 36},
                        new Object[]{2, "O0001", "Rode Bike", 1233.6, 16},
                        new Object[]{3, "O0001", "Touring Bike", 1563.3, 32},
                        new Object[]{4, "O0002", "Mountain Bike", 1419.5, 24},
                        new Object[]{5, "O0002", "Road Bike", 1233.6, 12},
                        new Object[]{6, "O0003", "Mountain Bike", 1419.5, 48},
                        new Object[]{7, "O0003", "Touring Bike", 1653.3, 8},
                    };
    foreach (Object[] row in rows)
    {
        orderDetailTable.Rows.Add(row);
    }
}
```

rows를 한번에 처리하기 위해 Object array type으로 처리했다.
Rows에는 Columns에 있는 AddRange 같은 메서드가 없는 듯 하다. 그래서 loop로 처리한다.

```cs
DataColumn colSub = new DataColumn("SubTotal", typeof(Decimal), "Sum(Child.LineTotal)");
orderTable.Columns.Add(colSub);
DataColumn colTax = new DataColumn("Tax", typeof(Decimal), "SubTotal*0.1");
orderTable.Columns.Add(colTax);
DataColumn colTotal = new DataColumn("TotalDue", typeof(Decimal),
    "IIF(OrderId='Total',Sum(SubTotal)+Sum(Tax),SubTotal+Tax)");
orderTable.Columns.Add(colTotal);

DataRow row = orderTable.NewRow();
row["OrderId"] = "Total";
orderTable.Rows.Add(row);
```

orderTable에 column을 추가한다.
각 column은 expression으로 column의 행위를 정의했다.
TotalDue column은 IIF 함수를 이용하여 T/F part를 각각 정의했다.

```cs
private static void ShowTable(DataTable table)
{
    foreach (DataColumn col in table.Columns)
    {
        Console.Write("{0, -14}", col.ColumnName);
    }
    Console.WriteLine();

    foreach (DataRow row in table.Rows)
    {
        foreach (DataColumn col in table.Columns)
        {
            if (col.DataType.Equals(typeof(DateTime)))
                Console.Write("{0, -14:d}", row[col]);
            else if (col.DataType.Equals(typeof(Decimal)))
                Console.Write("{0, -14:C}", row[col]);
            else
                Console.Write("{0, -14}", row[col]);
        }
        Console.WriteLine();
    }
    Console.WriteLine();
}
```

DataTable의 데이터를 불러올 때는 이중 loop로 row, column에 접근한다.
