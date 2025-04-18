
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export function AutomationTaskForm() {
  const [taskName, setTaskName] = useState("");
  const [triggerType, setTriggerType] = useState("");
  const [action, setAction] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate task creation
    toast({
      title: "Automation Task Created",
      description: `Created task: ${taskName}`,
      variant: "default",
    });

    // Reset form
    setTaskName("");
    setTriggerType("");
    setAction("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Automation Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Task Name</label>
            <Input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="e.g., Schedule Maintenance When Battery Low"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Trigger</label>
            <Select value={triggerType} onValueChange={setTriggerType}>
              <SelectTrigger>
                <SelectValue placeholder="Select trigger" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="battery">Battery Level Below 20%</SelectItem>
                <SelectItem value="maintenance">Maintenance Due</SelectItem>
                <SelectItem value="safety">Safety Score Below 80</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Action</label>
            <Select value={action} onValueChange={setAction}>
              <SelectTrigger>
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="schedule">Schedule Maintenance</SelectItem>
                <SelectItem value="notify">Notify Manager</SelectItem>
                <SelectItem value="route">Reroute Vehicle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Create Automation Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
