import csv
import pandas as pd
# Reading CSV
df = pd.read_csv('data_sample(1).csv')

# Modify Dataframe
dfm = df.assign(ActualCost = '', SoldPrice = '', MarginOfProfit = '')
#print(dfm)

# Adding ActualCost, SoldPrice and MarginOfProfit into dataframe
# ActualCost = RawMaterial + Workmanship + StorageCost
# SoldPrice = EstimatedCost * 1.1
# MarginOfProfit = SoldPrice - ActualCost

for i in dfm:
    # Adding SoldPrice
    soldprice = round(dfm.EstimatedCost * 1.1,2)
    dfm = dfm.assign(SoldPrice = soldprice)

    # Adding ActualCost
    actualcost = dfm.RawMaterial + dfm.Workmanship + dfm.StorageCost
    dfm = dfm.assign(ActualCost = actualcost)

    # Adding MarginOfProfit
    profitmargin = round(dfm.SoldPrice - dfm.ActualCost,2)
    dfm = dfm.assign(MarginOfProfit = profitmargin)

    # Cleaning up column Names
    dfm = dfm.rename(columns={'date':'Date'})

#print(dfm) debugging

dfm.to_csv('new_data_sample(1).csv', index = False)