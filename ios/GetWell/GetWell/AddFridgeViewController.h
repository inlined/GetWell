//
//  NewFridgeViewController.h
//  GetWell
//
//  Created by Thomas Bouldin on 9/15/12.
//  Copyright (c) 2012 HackForGood. All rights reserved.
//

#import <Parse/Parse.h>
#include "WatchedFridgeViewController.h"

@interface AddFridgeViewController : PFQueryTableViewController
@property (nonatomic, weak) WatchedFridgeViewController *delegate;
- (IBAction)cancel:(id)sender;
@end
