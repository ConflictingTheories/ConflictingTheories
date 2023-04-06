# Shopify Madness

~ 2023-03-06 13:11:14+00:00 ~

I have had the unfortunate displeasure of working with the Shopify API lately, and I must say it is one of the worst experiences I have had to date.

Let's save the rant for another time. I have plenty of hateful things to say about Shopify, but this post is not about that.

No, this post is about solutions. Something Shopify will never willingly provide, so I would like to save some souls today.

### Problem with Shopify Data

Lets start with properly identifying the problem: the data they display vs what we get in the reports (and API) are rarely matching. If you do any sort of significant volume, have any refunds or disputes, or offer things such as discounts then Shopify will likely bring just as many headaches along as it claims to solve - once you attempt to account that is.

Shopify does not seem to bother attempting to make these discrepancies known...and in fact I sometimes wonder if it purposefully is hiding them, but let's not deviate. Usually they are noticeable if you have exported a report and went to compare it with the expectations you had developed off of their native dashboard.

The main issues are mainly that people may notice that some of the totals seem to be different in their exported reports versus what they are seeing when they login.

The reasons are numerous but there does seem to be a collection of causes for these differences and they are finite.

- Order Adjustments (Manual / automatic / in-post)

- Order Refunds (Date Refunded vs Order Date)

- Partial Refunds vs Full Refunds

- Disputes in Prices / Refunds / Etc

- Included Taxes vs Excluded Taxes

- Date Ordered vs Date Processed


### Adjustments vs Refunds

Shopify supports both "adjustments" as well as "refunds" and they can sometimes overlap whilst at others be wholly independent.

A refund is typically associated with a "return" but not always, and in either case it is tied to the Total Refunded Amount which accounts for the sum of the refunds. But this does not account for manual adjustments or changes.

For those we must look to "adjustments" which are any changes made to the order values during the process. This can be made manually, or in some cases seems to be applied without manual intervention. Adjustments can impact the final totals, but will not impact the originals.

The combination of manual adjustments and total refunds is what we consider the "Total Adjusted Amount" and this is what is typically thought of when we consider the final tallies vs the original totals before the refunds and edits we made.

### Refund Dates

Additionally, there is a discrepancy when the order is registered as being refunded. In some cases it comes up as the date the refund was made, but in other cases it is displayed relative to the original order date. This can cause issues when there is a question of when to apply the value in a calculated total (especially when dealing with days).

This tends to require you decide where to apply the refund. Contextually they have different implications and can skew the decision making outcome. (For example analysis of a sale day vs the # of returns generated is a different issue than cashflow)

This also bleeds over into final tallies as you will need to account for additional refunds which may not have the other elements always included (taxes, shipping, etc) and when combined with adjustments you will really need to stay cognizant of what assumptions you are playing with.

### Solution?

I recommend working with at least two sets of data so that you can cleanly isolate the causes and make sure you keep them separated from one another so as to know which is which.

Technically, they are all connected, but the ways in which they connect are not always so clear to draw and usually require you keep track of different components at numerous spots as they flow in and out.

I tend to work on 2 main sets of data, then the components underneath as a third set to compare and calculate with.

1. Unadjusted Data: all the data which is associated with the orders before any disputes or adjustments were made. This will give me a clear picture of the data that happened in the "best case" scenario.
2. Adjusted Data: all the data which is associated with orders **after** the adjustments and edits have been made. This gives me a picture of the reality of what happened.
3. Adjustments, Refunds, Original Sales: all the data which makes up the different components. This will give me more insight into which components were refunds, which were disputes, and which came in from a previous order in the past - allowing me to better see into different aspects of the business.

So what does this flow look like? Well it looks a little like the following graphic:

![Shopify Unadjusted Flow](/content/media/shopify.png)
