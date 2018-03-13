({
	removeLineItem : function(component, event, helper) {
        if(!$A.util.isEmpty(component.get("v.removeLineItem"))) {
            var quoteLineItems = component.get("v.quoteLineItems");
            var result = new Array();
            for(var i=0; i<quoteLineItems.length; i=i+1) {
                if(quoteLineItems[i] != null) {
                    if(quoteLineItems[i].Product2Id !== component.get("v.removeLineItem")) {
                        result.push(quoteLineItems[i]);
                    }
                }
            }
            component.set("v.quoteLineItems", result);            
            component.set("v.removeLineItem", "");
        }
	},
    addProduct: function(component, event, helper) {
        var navigate = component.get("v.navigateFlow");
        navigate("NEXT");
    },
    handleNavigate: function(component, event, helper) {
        var navigate = component.get("v.navigateFlow");
        var actionName = event.getParam("action");
        // alert(actionName);
        if(actionName == "NEXT") {

			/* In a weird bug - as Products are added to the
			 * quoteLineItems collection (and in turn the attribute in this component)
			 * the first element in the collection is always NULL.
			 * So, I have to re-populate the attribute stripping out nulls
			 * when moving on to the next flow step
			 */

            // Demo purposes
            alert(JSON.stringify(component.get("v.quoteLineItems")));
            
            // Strip out NULLs and re-populate the quoteLineItems attribute
            var quoteLineItems = component.get("v.quoteLineItems");
            var result = new Array();
            for(var i=0; i<quoteLineItems.length; i=i+1) {
                if(quoteLineItems[i] != null) {
                    result.push(quoteLineItems[i]);
                }
            }
            component.set("v.quoteLineItems", result);  
            
            // Demo purposes
//            alert(JSON.stringify(component.get("v.quoteLineItems")));

			// Now set the flow variable 'ContinueSelectingProducts'
			// to false via the attribute Continue_selecting_Products
            component.set("v.Continue_selecting_Products", "false");
        }
        
        // Navigate the flow
        navigate(actionName);
    }
})