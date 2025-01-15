namespace DataGateway
{
	internal abstract class BaseGateway(IDataAdapter pAdapter)
	{
		protected readonly IDataAdapter _adapter = pAdapter;
	}
}
