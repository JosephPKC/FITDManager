using Utils.Exceptions;

namespace FitdEntity.Sheets.Clocks
{
	public class Clock(int pSegments, int pMarks = 0)
	{
		// Note: Simple modelling of a clock's segments as just a number.
		// If we need to have a more precise model, we can turn this into a boolean array instead.
		public int Segments { get; private set; } = pSegments;
		public int Marks { get; private set; } = pMarks;

		public int UnmarkedSegments {
			get
			{
				return Segments - Marks;
			}
		}

		public bool IsComplete {
			get
			{
				return Segments == Marks;
			}
		}

		/// <summary>
		/// Mark the specified number of segments.
		/// </summary>
		/// <param name="pSegments">Number of segments to mark. Default: 1 segment.</param>
		/// <returns>True, if marking is successful. False, if there are not enough unmarked segments.</returns>
		public bool Mark(int pSegments = 1)
		{
			ArgumentExceptionExt.ThrowIfNegative(nameof(pSegments), pSegments);

			if (UnmarkedSegments < pSegments)
			{
				return false;
			}

			Marks += pSegments;
			return true;
		}

		/// <summary>
		/// Unmark the specified number of segments.
		/// </summary>
		/// <param name="pSegments">Number of segments to mark. Default: 1 segment.</param>
		/// <returns>True, if unmarking is successful. False, if there are not enough marked segments.</returns>
		public bool Unmark(int pSegments = 1)
		{
			ArgumentExceptionExt.ThrowIfNegative(nameof(pSegments), pSegments);

			if (Marks < pSegments)
			{
				return false;
			}

			Marks -= pSegments;
			return true;
		}

		/// <summary>
		/// Resets the clock. Typically, when a clock completes you may want to also reset it.
		/// </summary>
		public void Reset()
		{
			Marks = 0;
		}
	}
}
