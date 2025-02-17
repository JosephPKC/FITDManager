
using Microsoft.AspNetCore.Mvc;

namespace FitDManager.Server
{
    [ApiController]
    [Route("api/bitd/sheets/char")]
    public class BitdCharSheetApi : Controller
    {
		private BitdCharSheet Sheet {
			get
			{
				return ApiState.Instance.Sheet;
			}
		}

        [HttpGet("{id}")]
        [ProducesResponseType<BitdCharSheet>(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetSheet(string id)
        {
            if (id == "test0")
            {
                return Ok(Sheet);
            }
            return NotFound();
		}

		[HttpPut("{id}")]
		[ProducesResponseType<BitdCharSheet>(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult PutSheet(string id, [FromBody] BitdCharSheet pNewSheet)
		{
            Console.WriteLine("FROM BODY SHEET: " + pNewSheet.Name);
			if (id == "test0")
			{
                LoadSheet(pNewSheet);
				return Ok(Sheet);
			}
			return NotFound();
		}

		private void LoadSheet(BitdCharSheet pNewSheet)
        {
			Sheet.CrewName = pNewSheet.CrewName;
			Sheet.Name = pNewSheet.Name;
			Sheet.Alias = pNewSheet.Alias;
			Sheet.Look = pNewSheet.Look;
        }
	}
}
