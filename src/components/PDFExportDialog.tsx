import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, Mail, Calendar, Image as ImageIcon } from "lucide-react";

interface PDFExportDialogProps {
  trigger?: React.ReactNode;
  dashboardName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const PDFExportDialog = ({ trigger, dashboardName = "Dashboard", open: controlledOpen, onOpenChange }: PDFExportDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;
  const [reportTitle, setReportTitle] = useState(`${dashboardName} Report`);
  const [template, setTemplate] = useState("detailed");
  const [sections, setSections] = useState({
    summary: true,
    charts: true,
    tables: true,
    insights: true,
  });
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    // Simulate export process
    setTimeout(() => {
      setExporting(false);
      setOpen(false);
      // In real implementation, would generate and download PDF
    }, 2000);
  };

  const toggleSection = (section: keyof typeof sections) => {
    setSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Export to PDF</DialogTitle>
          <DialogDescription>
            Configure your report and preview before exporting
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="configure" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="configure">Configure</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="configure" className="space-y-6 mt-6">
            {/* Report Title */}
            <div className="space-y-2">
              <Label htmlFor="report-title">Report Title</Label>
              <Input
                id="report-title"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                placeholder="Enter report title"
              />
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <Label>Date Range</Label>
              <div className="flex gap-2">
                <Input type="date" defaultValue="2025-11-01" />
                <span className="flex items-center px-2">to</span>
                <Input type="date" defaultValue="2025-12-03" />
              </div>
            </div>

            {/* Template Selection */}
            <div className="space-y-3">
              <Label>Report Template</Label>
              <RadioGroup value={template} onValueChange={setTemplate}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="executive" id="executive" />
                  <div className="flex-1">
                    <Label htmlFor="executive" className="cursor-pointer font-medium">
                      Executive Summary
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      1-page overview with key metrics and insights
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="detailed" id="detailed" />
                  <div className="flex-1">
                    <Label htmlFor="detailed" className="cursor-pointer font-medium">
                      Detailed Report
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Multi-page report with all charts and tables
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer">
                  <RadioGroupItem value="presentation" id="presentation" />
                  <div className="flex-1">
                    <Label htmlFor="presentation" className="cursor-pointer font-medium">
                      Client Presentation
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Branded, visual-heavy format for presentations
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Sections to Include */}
            <div className="space-y-3">
              <Label>Include Sections</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="summary"
                    checked={sections.summary}
                    onCheckedChange={() => toggleSection("summary")}
                  />
                  <Label htmlFor="summary" className="cursor-pointer">
                    Executive Summary
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="charts"
                    checked={sections.charts}
                    onCheckedChange={() => toggleSection("charts")}
                  />
                  <Label htmlFor="charts" className="cursor-pointer">
                    Charts & Visualizations
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tables"
                    checked={sections.tables}
                    onCheckedChange={() => toggleSection("tables")}
                  />
                  <Label htmlFor="tables" className="cursor-pointer">
                    Data Tables
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="insights"
                    checked={sections.insights}
                    onCheckedChange={() => toggleSection("insights")}
                  />
                  <Label htmlFor="insights" className="cursor-pointer">
                    AI Insights & Recommendations
                  </Label>
                </div>
              </div>
            </div>

            {/* Branding Options */}
            <div className="space-y-3">
              <Label>Branding (Optional)</Label>
              <div className="grid gap-3">
                <div className="space-y-2">
                  <Label htmlFor="logo" className="text-sm text-muted-foreground">
                    Company Logo
                  </Label>
                  <div className="flex gap-2">
                    <Input id="logo" type="file" accept="image/*" />
                    <Button variant="outline" size="sm">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="space-y-3">
              <Label>Delivery</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="download" defaultChecked />
                  <Label htmlFor="download" className="cursor-pointer">
                    Download immediately
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="email" />
                  <Label htmlFor="email" className="cursor-pointer">
                    Email to recipients
                  </Label>
                </div>
                <Input placeholder="email@example.com" className="ml-6" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <Card className="bg-muted/30">
              <CardContent className="p-6">
                {/* PDF Preview Mockup */}
                <div className="space-y-4 bg-white p-8 rounded-lg shadow-sm border">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">{reportTitle}</h2>
                      <p className="text-sm text-muted-foreground">
                        Report Period: November 1, 2025 - December 3, 2025
                      </p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>Generated on {new Date().toLocaleDateString()}</p>
                      <p>Page 1 of 12</p>
                    </div>
                  </div>

                  {/* Executive Summary Section */}
                  {sections.summary && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">Executive Summary</h3>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="p-3 border rounded">
                          <p className="text-xs text-muted-foreground">Total Revenue</p>
                          <p className="text-xl font-bold">$346,820</p>
                          <p className="text-xs text-green-500">↑ 12.3%</p>
                        </div>
                        <div className="p-3 border rounded">
                          <p className="text-xs text-muted-foreground">Active Users</p>
                          <p className="text-xl font-bold">12,847</p>
                          <p className="text-xs text-green-500">↑ 8.1%</p>
                        </div>
                        <div className="p-3 border rounded">
                          <p className="text-xs text-muted-foreground">Conversion Rate</p>
                          <p className="text-xl font-bold">3.24%</p>
                          <p className="text-xs text-red-500">↓ 2.4%</p>
                        </div>
                        <div className="p-3 border rounded">
                          <p className="text-xs text-muted-foreground">Engagement</p>
                          <p className="text-xl font-bold">87.5</p>
                          <p className="text-xs text-green-500">↑ 5.2%</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Charts Section */}
                  {sections.charts && (
                    <div className="space-y-3">
                      <Separator />
                      <h3 className="text-lg font-semibold">Performance Charts</h3>
                      <div className="h-48 bg-muted/50 rounded flex items-center justify-center">
                        <p className="text-muted-foreground">[Revenue Chart Visualization]</p>
                      </div>
                    </div>
                  )}

                  {/* Tables Section */}
                  {sections.tables && (
                    <div className="space-y-3">
                      <Separator />
                      <h3 className="text-lg font-semibold">Data Tables</h3>
                      <div className="text-xs">
                        <table className="w-full border">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="p-2 text-left">Metric</th>
                              <th className="p-2 text-right">Current</th>
                              <th className="p-2 text-right">Previous</th>
                              <th className="p-2 text-right">Change</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t">
                              <td className="p-2">Revenue</td>
                              <td className="p-2 text-right">$346,820</td>
                              <td className="p-2 text-right">$308,920</td>
                              <td className="p-2 text-right text-green-500">+12.3%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* AI Insights Section */}
                  {sections.insights && (
                    <div className="space-y-3">
                      <Separator />
                      <h3 className="text-lg font-semibold">AI Strategic Insights</h3>
                      <div className="space-y-2">
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                          <p className="text-sm font-medium">Opportunity: Revenue Growth</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Your revenue is up 12.3% but conversion rate dropped 2.4%...
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="pt-4 border-t text-xs text-muted-foreground text-center">
                    <p>Generated by ENABLE Data Platform | © 2025 Echelon</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground text-center mt-4">
                  This is a preview. The actual PDF will contain full-resolution charts and data.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={exporting}>
            {exporting ? (
              <>
                <Calendar className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Generate PDF
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
