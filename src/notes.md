# What we know

We can fetch:

- getAppProperties
- getReportTypeId

before any other call since it contains information we need to load other data.

# What can we do

We can keep the data fetching to each component and it can render once we have
fetched reportTypeId data (this will be the filter data)

So in a component we can do something like

```
useEffect(() => {
  const isFetchData = reportTypeIdFetchStatus === 'success'

  isFetchData && fetchReportTypeId({
    ...props
  })
}, [reportTypeIdFetchStatus, fetchReportTypeId, ...props])
```

## Potential issues

One issue we can run into here is doubled calls to the service.

And as always, the most important call is fetching the initial data to charts
and grid which currently makes this a bit more tricky.

Can I create a loading state for the component as it fetched data? or is that
already done by the empty data handlers in the code.
