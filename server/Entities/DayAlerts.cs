//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Entities
{
    using System;
    using System.Collections.Generic;
    
    public partial class DayAlerts
    {
        public int id { get; set; }
        public Nullable<System.DateTime> date { get; set; }
        public Nullable<bool> isTaken { get; set; }
        public Nullable<int> alertId { get; set; }
    
        public virtual Alerts Alerts { get; set; }
    }
}
