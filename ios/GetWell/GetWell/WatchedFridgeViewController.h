//
//  WatchedFridgeViewController.h
//  GetWell
//
//  Created by Thomas Bouldin on 9/15/12.
//  Copyright (c) 2012 HackForGood. All rights reserved.
//

#import <Parse/Parse.h>

@interface WatchedFridgeViewController : PFQueryTableViewController
-(void)watchNewObject:(PFObject *)object;
-(NSArray *)watchedIds;
@end
