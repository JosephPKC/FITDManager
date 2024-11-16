namespace FitdEntity.Playbooks.DataParts.Claims
{
    public class ClaimPos
    {
        public int X { get; set; } = 0;
        public int Y { get; set; } = 0;

        /* Links */
        public bool LinkLeft { get; set; } = false;
        public bool LinkRight { get; set; } = false;
        public bool LinkUp { get; set; } = false;
        public bool LinkDown { get; set; } = false;
    }
}
