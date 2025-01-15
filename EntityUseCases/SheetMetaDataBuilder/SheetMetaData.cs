﻿using FitdConfig;

namespace SheetMetaDataBuilder
{
	public class SheetMetaData
	{
		public required Guid Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public required DateTime DateCreated { get; set; }
		public DateTime? DateLastModified { get; set; }
		public GameTypes GameType { get; set; } = GameTypes.None;
	}
}